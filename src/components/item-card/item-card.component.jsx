import './item-card.style.scss';
import Button from "../button/button.component";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/cart/cart-action";
import {selectCartItems} from "../../store/cart/cart-selector";

const ItemCard = ({cartItem}) => {
    const { name, price, imageUrl } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, cartItem));

    return(
        <div className='item-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to cart</Button>
        </div>
    )
}

export default ItemCard;