import './item-card.style.scss';
import Button from "../button/button.component";

const ItemCard = ({item}) => {
    const { name, price, imageUrl } = item;
    return(
        <div className='item-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted'>Add to cart</Button>
        </div>
    )
}

export default ItemCard;