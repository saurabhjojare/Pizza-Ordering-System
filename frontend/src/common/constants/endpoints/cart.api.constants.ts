const API_BASE_URL = "http://localhost:5001/api";

export const CART_API = {
    CREATE: `${API_BASE_URL}/cart`,
    GET_BY_USER_ID: (userId: number) => `${API_BASE_URL}/cart/user/${userId}`,
    UPDATE: (cartId: number) => `${API_BASE_URL}/cart/${cartId}`,
    DELETE: (cartId: number) => `${API_BASE_URL}/cart/${cartId}`,
};