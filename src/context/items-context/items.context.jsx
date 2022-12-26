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

export const ItemsContext = createContext({
    cartItems: [],
    addItemToCart: () => {}
})

export const ItemsProvider = ({children}) => {
    const items = Items;
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
       setCartItems(addCartItem(cartItems, productToAdd));
        console.log(cartItems);
    }

    const value = {items, addItemToCart, cartItems}

    return(
        <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
    )
}

