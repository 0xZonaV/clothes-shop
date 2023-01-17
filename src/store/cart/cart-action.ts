import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
// @ts-ignore
import {CART_ACTION_TYPES, CartItem} from "./cart-types";
import {CategoryItem} from "../category/category-types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CategoryItem) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
            return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
        }
    }
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CategoryItem) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export const setCartItems = withMatcher((newCartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const decreaseItemQuantity = (cartItems: CartItem[], cartItemToRemove:CategoryItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
};

export const removeItem = (cartItems: CartItem[], cartItemToClear: CategoryItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
};

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));