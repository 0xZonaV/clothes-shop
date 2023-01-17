import {CategoryItem} from "../category/category-types";

export enum CART_ACTION_TYPES {
    SET_IS_CART_OPEN= 'cart/SET_IS_CART_OPEN',
    SET_CART_ITEMS= 'cart/SET_CART_ITEMS',
    SET_QUANTITY= 'cart/SET_QUANTITY',
    SET_COST= 'cart/SET_COST'
}


export type CartItemType = CategoryItem & {
    quantity: number;
}