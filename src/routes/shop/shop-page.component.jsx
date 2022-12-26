import {useContext} from "react";
import {ItemsContext} from "../../context/items-context/items.context";
import ItemCard from "../../components/item-card/item-card.component";
import './shop-page.style.scss';

const ShopPage = () => {
    const {items} = useContext(ItemsContext);

    return(
        <div className='items-container'>
            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    )
}

export default ShopPage;