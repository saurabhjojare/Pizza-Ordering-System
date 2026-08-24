import { useEffect, useState } from "react";
import { Order } from "../../../common/interfaces/order.interface";
import { deliverOrder, getOrders } from "../../../common/services/order.service";
import { Labels } from "../../../common/enums/labels.enums";
import { getToken, getUserRoleFromToken } from "../../../common/utils/authentication.utils";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";


export const useAllOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = Labels.ORDER_CENTER;

        if (!getToken() || getUserRoleFromToken() !== "admin") {
            navigate(Routes.ROOT, { replace: true });
        }

        getOrders()
            .then(setOrders)
            .catch(() => setError("Failed to fetch orders"));
    }, []);

    const handleDeliver = async (id: number) => {
        try {
            await deliverOrder(id);
            setOrders(orders =>
                orders.map(order =>
                    order.order_id === id
                        ? { ...order, status: "DELIVERED" }
                        : order
                )
            );
        } catch {
            setError("Failed to mark order as delivered");
        }
    };

    return { orders, error, handleDeliver };
};