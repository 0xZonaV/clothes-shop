import {Route, Routes} from "react-router-dom";
import './shop-page.style.scss';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {fetchCategoriesStart} from "../../store/category/category-action";
import {useDispatch} from "react-redux";


const ShopPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, []);

    return(
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
};

export default ShopPage;