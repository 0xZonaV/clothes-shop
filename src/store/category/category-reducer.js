import {CATEGORIES_ACTION_TYPES} from "./category-types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

const {FETCH_CATEGORIES_FAILED, FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS} = CATEGORIES_ACTION_TYPES;

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_CATEGORIES_START:
            return {...state, isLoading: true};
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: payload, isLoading: false};
        case FETCH_CATEGORIES_FAILED:
            return {...state, error: payload, isLoading: false};
        default:
            return state
    }
}
