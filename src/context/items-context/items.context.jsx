import {createContext, useEffect, useState} from "react";
import Items from '../../shop-data.json';

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
        totalCost: 0
    })

export const ItemsProvider = ({children}) => {
    const items = Items;
    const [cartItems, setCartItems] = useState([]);
    const [allQuantity, setAllQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total,cartItem) => total+(cartItem.quantity * cartItem.price), 0);
        setTotalCost(newCartTotal)
    }, [cartItems]);

    useEffect(() => {
        const newAllQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        setAllQuantity(newAllQuantity);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
       setCartItems(addCartItem(cartItems, productToAdd));
    }

    const decreaseItemQuantity = (productToDecrease) => {
        setCartItems(decreaseItem(cartItems, productToDecrease));
    }

    const removeItem = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const value = {items, addItemToCart, cartItems, allQuantity, decreaseItemQuantity, removeItem, totalCost}

    return(
        <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
    )
}

