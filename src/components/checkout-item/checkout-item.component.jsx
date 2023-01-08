import './checkout-item.style.scss';
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, decreaseItemQuantity, removeItem} from "../../store/cart/cart-action";
import {selectCartItems} from "../../store/cart/cart-selector";

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, quantity, price} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const increase =() => dispatch(addItemToCart(cartItems, cartItem));


    const decrease = () => dispatch(decreaseItemQuantity(cartItems, cartItem))


    const remove = () => dispatch(removeItem(cartItems, cartItem))


    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
                <div className='quantity'>
                    <div className='arrow' onClick={decrease}>&#10094;</div>
                    {quantity}
                    <div className='arrow' onClick={increase}>&#10095;</div>
                </div>
            <div onClick={remove} className='remove-button'>&#10005;</div>
        </div>)
}

export default CheckoutItem;