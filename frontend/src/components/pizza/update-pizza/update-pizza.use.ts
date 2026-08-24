import { useEffect, useState } from "react";
import { UpdatePizza } from "../../../common/interfaces/pizza.interface";
import { getPizzaById, updatePizza } from "../../../common/services/pizza.service";
import { Labels } from "../../../common/enums/labels.enums";
import { getToken, getUserRoleFromToken } from "../../../common/utils/authentication.utils";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";

export const useUpdatePizza = (id: number) => {
    const [pizza, setPizza] = useState<UpdatePizza | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = Labels.UPDATE_PIZZA;


        if (!getToken() || getUserRoleFromToken() !== "admin") {
            navigate(Routes.ROOT, { replace: true });
        }

        getPizzaById(id)
            .then(({ pizza_id, created_at, ...pizza }) => setPizza(pizza))
            .catch(() => setError("Failed to fetch pizza"));
    }, [id]);

    const update = async () => {
        if (!pizza) return;

        try {
            setSaving(true);
            updatePizza(id, pizza);
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
        } catch {
            setError("Failed to update pizza");
        } finally {
            setSaving(false);
        }
    };

    return { pizza, setPizza, error, saving, saved, update };
};