import axios from "axios";
import { getAuthorizationHeaders } from "../utils/authentication.utils";
import { ORDER_API } from "../constants/endpoints/order.api.constants";
import { CreateOrder, Order } from "../interfaces/order.interface";

export const placeOrder = async (order: CreateOrder): Promise<void> => {
  await axios.post(ORDER_API.PLACE_ORDER, order, getAuthorizationHeaders());
};

export const getOrders = async (): Promise<Order[]> => {
  return (await axios.get(ORDER_API.GET_ALL, getAuthorizationHeaders())).data;
};

export const getMyOrders = async (userId: number): Promise<Order[]> => {
  return (await axios.get(`${ORDER_API.GET_MY}?userId=${userId}`, getAuthorizationHeaders())).data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  return (await axios.get(ORDER_API.GET_BY_ID(id), getAuthorizationHeaders())).data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(ORDER_API.DELETE(id), getAuthorizationHeaders());
};

export const cancelOrder = async (id: number): Promise<void> => {
  await axios.patch(ORDER_API.CANCEL(id), {}, getAuthorizationHeaders());
};

export const deliverOrder = async (id: number): Promise<void> => {
  await axios.patch(ORDER_API.DELIVER(id), {}, getAuthorizationHeaders());
};
