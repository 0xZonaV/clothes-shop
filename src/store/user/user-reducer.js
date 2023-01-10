import {USER_ACTION_TYPES} from "./user-types";

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isLoading: false
};

const {SIGN_IN_FAILED, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED} = USER_ACTION_TYPES;

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case SIGN_OUT_SUCCESS:
            return {...state, currentUser: null};
        case SIGN_UP_SUCCESS:
            return {...state, currentUser: payload, isLoading: false};
        case SIGN_IN_SUCCESS:
            return {...state, currentUser: payload, isLoading: false};
        case SIGN_IN_FAILED:
        case SIGN_UP_FAILED:
        case SIGN_OUT_FAILED:
            return {...state, error: payload, isLoading: false};
        default:
            return state;
    }
};