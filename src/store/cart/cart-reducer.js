import {CART_ACTION_TYPES} from "./cart-types";

const { SET_CART_ITEMS, SET_IS_CART_OPEN } = CART_ACTION_TYPES;

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case SET_CART_ITEMS:
            return {...state, cartItems: payload};
        case SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload};
        default:
            return state;
    }
}