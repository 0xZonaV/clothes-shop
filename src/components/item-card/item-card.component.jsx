import './item-card.style.scss';
import Button from "../button/button.component";
import {useContext} from "react";
import {ItemsContext} from "../../context/items-context/items.context";

const ItemCard = ({item}) => {
    const { name, price, imageUrl } = item;
    const {addItemToCart} = useContext(ItemsContext);

    const addProductToCart = () => {
        addItemToCart(item);
    }

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