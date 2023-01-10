import {createAction} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES} from "./category-types";

const {FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED} = CATEGORIES_ACTION_TYPES;

export const fetchCategoriesStart = () => createAction(FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) => createAction(FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) => createAction(FETCH_CATEGORIES_FAILED, error);