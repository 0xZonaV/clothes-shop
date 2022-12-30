import {createContext, useReducer} from "react";

export const CartDropdownSwitchContext = createContext({
        isCartOpen: false,
        setIsCartOpen: () => {}
    })

const INITIAL_STATE = {
    isCartOpen: false
}


const cartDropdownReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'OPEN_CART':
            return {...state, isCartOpen: payload}
        default:
            throw new Error(`Unhandled type ${type} in cartDropdownReducer`)
    }
};


export const CartDropdownSwitchProvider = ({children}) => {

    const [{isCartOpen}, dispatch] = useReducer(cartDropdownReducer, INITIAL_STATE);

    const setIsCartOpen = (handler) => dispatch({type: 'OPEN_CART', payload: handler })

    const value = {isCartOpen, setIsCartOpen};

    return(
        <CartDropdownSwitchContext.Provider value={value}>{children}</CartDropdownSwitchContext.Provider>
    )
}