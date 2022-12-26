import {createContext, useState} from "react";
import Items from '../../shop-data.json';

export const ItemsContext = createContext({

})

export const ItemsProvider = ({children}) => {
    const [items, setItems] = useState(Items);
    const value = {items}

    return(
        <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
    )
}

