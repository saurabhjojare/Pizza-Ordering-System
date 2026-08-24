import axios from "axios";
import { getAuthorizationHeaders } from "../utils/authentication.utils";
import { CART_API } from "../constants/endpoints/cart.api.constants";
import { Cart } from "../interfaces/cart.interface";

export const addToCart = (userId: number, pizzaId: number, quantity: number) => {
    axios.post(CART_API.CREATE, { user_id: userId, pizza_id: pizzaId, quantity }, getAuthorizationHeaders());
}

export const getUserCart = async (userId: number): Promise<Cart[]> => {
    const { data } = await axios.get<Cart[]>(CART_API.GET_BY_USER_ID(userId), getAuthorizationHeaders());
    return data;
};

export const updateCart = (cartId: number, quantity: number) => {
    axios.patch(CART_API.UPDATE(cartId), { quantity }, getAuthorizationHeaders());
}

export const deleteCartItem = (cartId: number) => {
    axios.delete(CART_API.DELETE(cartId), getAuthorizationHeaders());
}