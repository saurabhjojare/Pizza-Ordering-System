import axios from "axios";
import { getAuthorizationHeaders } from "../utils/authentication.utils";
import { USER_API } from "../constants/endpoints/user.api.constants";
import { SignUp, User } from "../interfaces/user.interface";

export const loginUser = async (email: string, password: string): Promise<string> => {
  const { data } = await axios.post(USER_API.LOGIN, { email: email.trim(), password: password.trim() });
  return data.access_token;
};

export const signUpUser = async (user: SignUp): Promise<void> => {
  const { confirm_password, ...data } = user;
  await axios.post(USER_API.CREATE, data);
};

export const getUsers = async (): Promise<User[]> => {
  return axios.get(USER_API.GET_ALL, getAuthorizationHeaders()).then(({ data }) => data);
};

export const getUserById = async (userId: number): Promise<User> => {
  const { data } = await axios.get(USER_API.GET_BY_ID(userId), getAuthorizationHeaders());
  return data;
};

export const updateUser = async (userId: number, user: Partial<User>): Promise<void> => {
  await axios.patch(USER_API.UPDATE(userId), user, getAuthorizationHeaders());
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(USER_API.DELETE(userId), getAuthorizationHeaders());
};