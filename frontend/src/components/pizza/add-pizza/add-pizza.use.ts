import { useEffect, useState } from "react";
import { Pizza } from "../../../common/interfaces/pizza.interface";
import { addPizza } from "../../../common/services/pizza.service";
import { getToken, getUserRoleFromToken } from "../../../common/utils/authentication.utils";
import { Labels } from "../../../common/enums/labels.enums";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";

const initialPizza: Partial<Pizza> = {
    name: "",
    type: "Vegetarian",
    price: 0,
    imageUrl: "",
    description: "",
};

export const useAddPizza = () => {
    const [pizza, setPizza] = useState<Partial<Pizza>>(initialPizza);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = Labels.ADD_PIZZA;

        if (!getToken() || getUserRoleFromToken() !== "admin") {
            navigate(Routes.ROOT, { replace: true });
        }
    }, [navigate]);


    const create = async () => {
        try {
            setSaving(true);
            setError(null);
            await addPizza(pizza);
            setPizza(initialPizza);
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
        } catch {
            setError("Failed to add pizza");
        } finally {
            setSaving(false);
        }
    };

    return { pizza, setPizza, saving, saved, error, create };
};