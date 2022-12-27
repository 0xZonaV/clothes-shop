import {createContext, useState} from "react";
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

const updateAllQuantity = (cartItems) => {
    const initialValue = 1;
    return cartItems.reduce((accumulator, currentValue) => accumulator+currentValue.quantity, initialValue)
}



export const ItemsContext = createContext({
    cartItems: [],
    addItemToCart: () => {},
    allQuantity: 0
})

export const ItemsProvider = ({children}) => {
    const items = Items;
    const [cartItems, setCartItems] = useState([]);
    const [allQuantity, setAllQuantity] = useState(0);

    const addItemToCart = (productToAdd) => {
       setCartItems(addCartItem(cartItems, productToAdd));
       setAllQuantity(updateAllQuantity(cartItems, productToAdd));
    }

    const value = {items, addItemToCart, cartItems, allQuantity, setAllQuantity}

    return(
        <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
    )
}

