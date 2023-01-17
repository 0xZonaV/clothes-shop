import './category.style.scss';
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ItemCard from "../../components/item-card/item-card.component";
import './category.style.scss';
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/category/category-selector";
import Spinner from "../../components/loading-spinner/spinner.component";

type CategoryParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryParams>() as CategoryParams;
    const isLoading = useSelector(selectCategoriesIsLoading);
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => setProducts(categoriesMap[category]), [category, categoriesMap]);

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ? (
                <Spinner /> ) : (
                    <div className='category-main-container'>
                        {products && products.map((product) => <ItemCard key={product.id} cartItem={product} />)}
                    </div>
            )}
        </Fragment>

    )
}

export default Category;