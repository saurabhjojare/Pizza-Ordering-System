const API_BASE_URL = "http://localhost:5001/api";

export const USER_API = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    CREATE: `${API_BASE_URL}/user`,
    GET_ALL: `${API_BASE_URL}/user`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/user/${id}`,
    UPDATE: (id: number) => `${API_BASE_URL}/user/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/user/${id}`,
};