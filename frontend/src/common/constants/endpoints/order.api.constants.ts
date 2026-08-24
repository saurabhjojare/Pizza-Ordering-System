const API_BASE_URL = "http://localhost:5001/api";

export const ORDER_API = {
    GET_ALL: `${API_BASE_URL}/orders`,
    GET_MY: `${API_BASE_URL}/orders/my`,
    PLACE_ORDER: `${API_BASE_URL}/orders`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/orders/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/orders/${id}`,
    CANCEL: (id: number) => `${API_BASE_URL}/orders/${id}/cancel`,
    DELIVER: (id: number) => `${API_BASE_URL}/orders/${id}/deliver`,
};