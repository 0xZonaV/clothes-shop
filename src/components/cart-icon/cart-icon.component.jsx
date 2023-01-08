import './cart-icon.style.scss';
import { ReactComponent as ShopingBag } from "../../assets/shopping-bag.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectCartQuantity, selectIsCartOpen} from "../../store/cart/cart-selector";
import {setIsCartOpen} from "../../store/cart/cart-action";

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    const allQuantity = useSelector(selectCartQuantity);

    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShopingBag className='shopping-icon' />
            <span className='item-count' >{allQuantity}</span>
        </div>
    )
}

export default CartIcon;