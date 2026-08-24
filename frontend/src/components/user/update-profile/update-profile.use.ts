import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../common/interfaces/user.interface";
import { Routes } from "../../../common/enums/routes.enum";
import { getUserById, updateUser } from "../../../common/services/user.service";
import { getUserIdFromToken, useRequireAuth } from "../../../common/utils/authentication.utils";

export const useUpdateUserProfile = () => {

  const [user, setUser] = useState<User | null>(null);
  const [updates, setUpdates] = useState<Partial<User>>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useRequireAuth(Routes.LOGIN);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setUser(await getUserById(Number(getUserIdFromToken())));
      } catch {
        setError("Failed to load profile.");
      }
    };

    loadUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser(user => user && { ...user, [name]: value });
    setUpdates(updates => ({ ...updates, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(Number(getUserIdFromToken()), updates);
      navigate(Routes.MY_PROFILE);
    } catch {
      setError("Failed to update profile.");
    }
  };

  return { user, error, handleChange, handleSubmit };
};