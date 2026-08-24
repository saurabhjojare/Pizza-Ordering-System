import { useEffect, useState } from "react";
import { User } from "../../../common/interfaces/user.interface";
import { getUsers } from "../../../common/services/user.service";
import { Labels } from "../../../common/enums/labels.enums";
import { getToken, getUserRoleFromToken } from "../../../common/utils/authentication.utils";
import { Routes } from "../../../common/enums/routes.enum";
import { useNavigate } from "react-router-dom";


export const UseAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = Labels.USER_DIRECTORY;

        if (!getToken() || getUserRoleFromToken() !== "admin") {
            navigate(Routes.ROOT, { replace: true });
        }

        getUsers()
            .then(setUsers)
            .catch(() => setError("Failed to fetch users"));
    }, []);

    return { users, error };
};