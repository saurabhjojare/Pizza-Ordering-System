import axios from "axios";
import { getAuthorizationHeaders } from "../utils/authentication.utils";
import { PIZZA_API } from "../constants/endpoints/pizza.api.constants";
import { Pizza, UpdatePizza } from "../interfaces/pizza.interface";

export const fetchPizzas = async (): Promise<Pizza[]> => {
  const { data } = await axios.get(PIZZA_API.GET_ALL);
  return data;
};

export const getPizzaById = async (pizzaId: number): Promise<Pizza> => {
  const { data } = await axios.get(PIZZA_API.GET_BY_ID(pizzaId), getAuthorizationHeaders());
  return data;
};

export const addPizza = async (pizza: unknown) => {
  axios.post(PIZZA_API.ADD, pizza, getAuthorizationHeaders());
};

export const updatePizza = (pizzaId: number, pizza: UpdatePizza) => {
  axios.patch(PIZZA_API.UPDATE(pizzaId), pizza, getAuthorizationHeaders());
}

export const deletePizza = (pizzaId: number) => {
  axios.delete(PIZZA_API.DELETE(pizzaId), getAuthorizationHeaders());
}