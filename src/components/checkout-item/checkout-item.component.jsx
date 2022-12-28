import './checkout-item.style.scss';
import {useContext} from "react";
import {ItemsContext} from "../../context/items-context/items.context";

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, quantity, price} = cartItem;
    const {addItemToCart, decreaseItemQuantity, removeItem} = useContext(ItemsContext);

    const increase =() => {
        addItemToCart(cartItem);
    }

    const decrease = () => {
        decreaseItemQuantity(cartItem)
    }

    const remove = () => {
        removeItem(cartItem)
    }

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