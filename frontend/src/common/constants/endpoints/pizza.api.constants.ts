const API_BASE_URL = "http://localhost:5001/api";

export const PIZZA_API = {
    GET_ALL: `${API_BASE_URL}/pizzas`,
    ADD: `${API_BASE_URL}/pizzas`,
    SEARCH_BY_NAME: `${API_BASE_URL}/pizzas/search-by-name`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/pizzas/${id}`,
    UPDATE: (id: number) => `${API_BASE_URL}/pizzas/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/pizzas/${id}`,
};