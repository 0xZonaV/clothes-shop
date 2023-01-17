import {createSelector} from "reselect";
// @ts-ignore
import {CartItemType} from "./cart-types";
import {CartState} from "./cart-reducer";
import {RootState} from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems: CartItemType[]) => cartItems.reduce((total,cartItem) => total + (cartItem.quantity * parseInt(cartItem.price)), 0)
);

export const selectCartQuantity = createSelector(
    [selectCartItems],
    (cartItems: CartItemType[]) => cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
);
