import './category.style.scss';
import {useParams} from "react-router-dom";
import {Fragment, useContext, useEffect, useState} from "react";
import {ItemsContext} from "../../context/items-context/items.context";
import ItemCard from "../../components/item-card/item-card.component";
import './category.style.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(ItemsContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => setProducts(categoriesMap[category]), [categoriesMap.category]);

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-main-container'>
                {products && products.map((product) => <ItemCard key={product.id} item={product} />)}
            </div>
        </Fragment>

    )


}

export default Category;