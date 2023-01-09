import {createAction} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES} from "./category-types";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";

const {FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED} = CATEGORIES_ACTION_TYPES;

export const fetchCategoriesStart = () => createAction(FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) => createAction(FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) => createAction(FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart());

        try {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            dispatch(fetchCategoriesSuccess(categoriesArray));
        } catch (error) {
            dispatch(fetchCategoriesFailed(error));
        }
    };
}