import { useEffect, useState } from "react";
import { User } from "../../../common/interfaces/user.interface";
import { Routes } from "../../../common/enums/routes.enum";
import { getUserIdFromToken } from "../../../common/utils/authentication.utils";
import { deleteUser, getUserById } from "../../../common/services/user.service";

export const useYourProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const userId = Number(getUserIdFromToken());

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setUser(await getUserById(userId));
      } catch {
        setError("Failed to load profile.");
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      localStorage.removeItem("token");
      window.location.href = Routes.ROOT;
    } catch {
      setError("Failed to delete profile.");
    }
  };

  return { user, error, handleDelete };
};