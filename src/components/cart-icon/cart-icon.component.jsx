import './cart-icon.style.scss';
import { ReactComponent as ShopingBag } from "../../assets/shopping-bag.svg";
import {useContext} from "react";
import {CartDropdownSwitchContext} from "../../context/cart-dropdown-switch/cart-dropdown-switch.context";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartDropdownSwitchContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);


    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShopingBag className='shopping-icon' />
            <span className='item-count' >0</span>
        </div>
    )
}

export default CartIcon;