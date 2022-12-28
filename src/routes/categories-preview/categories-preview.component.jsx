import {useContext} from "react";
import {ItemsContext} from "../../context/items-context/items.context";
import './categories-preview.style.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(ItemsContext);

    return(
        <div className='category-preview-container'>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} products={products} title={title} />
            })}
        </div>
    );
};

export default CategoriesPreview;