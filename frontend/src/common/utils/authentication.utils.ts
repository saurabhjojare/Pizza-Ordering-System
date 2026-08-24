import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Labels } from "../enums/labels.enums";

export const getToken = (): string | null =>
  localStorage.getItem(Labels.TOKEN.toLowerCase());

export const getAuthorizationHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const saveToken = (token: string): void => {
  localStorage.setItem(Labels.TOKEN.toLowerCase(), token);
};

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).sub || null;
  } catch {
    return null;
  }
};

export const getUserRoleFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).role || null;
  } catch {
    return null;
  }
};

export const useRedirectIfUserAuthenticated = (redirectTo: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken()) navigate(redirectTo, { replace: true });
  }, [navigate, redirectTo]);
};

export const useRequireAuth = (redirectTo: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) navigate(redirectTo, { replace: true });
  }, [navigate, redirectTo]);
};