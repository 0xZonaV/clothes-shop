import {createContext, useEffect, useReducer, useState} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return (cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        ))
    }

    return ([...cartItems, {...productToAdd, quantity: 1}]);
}

const removeCartItem = (cartItems, productToRemove) => {
    const index = cartItems.map(cartItem => cartItem.id).indexOf(productToRemove.id)
    cartItems.splice(index, 1);
    return cartItems
}

const decreaseItem = (cartItems, productToDecrease) => {
    const isQuantityRight = cartItems.find((cartItem) => (cartItem.id === productToDecrease.id) && (cartItem.quantity <= 1));

    if (isQuantityRight) {
        removeCartItem(cartItems, productToDecrease);
    }

    return (cartItems.map((cartItem) =>
            cartItem.id === productToDecrease.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        ))
}

export const ItemsContext = createContext({
        cartItems: [],
        addItemToCart: () => {
        },
        allQuantity: 0,
        decreaseItemQuantity: () => {
        },
        removeItem: () => {
        },
        totalCost: 0,
        categoriesMap: {}
    })

    const INITIAL_STATE = {
        cartItems: [],
        allQuantity: 0,
        totalCost: 0
    }

    export const CART_ACTION_TYPES = {
        SET_CART_ITEMS: 'SET_CART_ITEMS',
        SET_QUANTITY: 'SET_QUANTITY',
        SET_COST: 'SET_COST'
    }

    const cartReducer = (state, action) => {
        const {type, payload} = action;
        const {SET_CART_ITEMS} = CART_ACTION_TYPES;


        switch (type) {
            case SET_CART_ITEMS:
                return {...state, ...payload};
            default:
                throw new Error(`Unhandled type ${type} in cartReducer`);
        }
    };

export const ItemsProvider = ({children}) => {



    const [{ cartItems, allQuantity, totalCost}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {SET_CART_ITEMS} = CART_ACTION_TYPES;

    const [categoriesMap, setCategoriesMap] = useState({});

    const updateCartItemsReducer = (cartItems) => {
        const newCartTotal = cartItems.reduce((total,cartItem) => total+(cartItem.quantity * cartItem.price), 0);

        const newAllQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);

        const payload = {
            cartItems,
            allQuantity: newAllQuantity,
            totalCost: newCartTotal
        };

        dispatch({type: SET_CART_ITEMS, payload });
    };


    useEffect(() => {
        const getCategoriesMap = async () => {
            const result = await getCategoriesAndDocuments();
            setCategoriesMap(result);
        };

        getCategoriesMap()
    }, []);

    const addItemToCart = (productToAdd) => updateCartItemsReducer(addCartItem(cartItems, productToAdd));

    const decreaseItemQuantity = (productToDecrease) => updateCartItemsReducer(decreaseItem(cartItems, productToDecrease));


    const removeItem = (productToRemove) => updateCartItemsReducer(removeCartItem(cartItems, productToRemove));

    const value = {categoriesMap, addItemToCart, cartItems, allQuantity, decreaseItemQuantity, removeItem, totalCost};

    return(
        <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
    )
}

