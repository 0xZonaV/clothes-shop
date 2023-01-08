import './categories-preview.style.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/category/category-selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

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