import {createContext, useState} from "react";

export const CartDropdownSwitchContext = createContext({
        isCartOpen: false,
        setIsCartOpen: () => {}
    })

export const CartDropdownSwitchProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen};

    return(
        <CartDropdownSwitchContext.Provider value={value}>{children}</CartDropdownSwitchContext.Provider>
    )
}