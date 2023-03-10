import './categories-preview.style.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/category/category-selector";
import {FC, Fragment} from "react";
import Spinner from "../../components/loading-spinner/spinner.component";

const CategoriesPreview: FC = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)

    return(
        <Fragment>
            {isLoading ? <Spinner /> : (
                <div className='category-preview-container'>
                    {Object.keys(categoriesMap).map((title) => {
                        const products = categoriesMap[title];
                        return <CategoryPreview key={title} products={products} title={title} />
                    })}
                </div>
            )}
        </Fragment>
    );
};

export default CategoriesPreview;