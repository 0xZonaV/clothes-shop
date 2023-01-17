import './cart-item.style.scss';
import {CartItemType} from "../../store/cart/cart-types";
import {FC, memo} from "react";

type CartItemProps = {
    cartItem: CartItemType
}

const CartItem: FC<CartItemProps> = memo(({cartItem}) => {
    const {name, quantity, imageUrl, price} = cartItem;

    return(
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} X ${price}</span>
            </div>

        </div>
    )
})

export default CartItem;