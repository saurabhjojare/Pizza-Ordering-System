import { useEffect, useState } from "react";
import { Order } from "../../../common/interfaces/order.interface";
import { cancelOrder, getMyOrders } from "../../../common/services/order.service";
import { getUserIdFromToken, useRequireAuth } from "../../../common/utils/authentication.utils";
import { Routes } from "../../../common/enums/routes.enum";
import { Labels } from "../../../common/enums/labels.enums";

export const useMyOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    useRequireAuth(Routes.LOGIN);

    useEffect(() => {
        document.title = Labels.MY_ORDERS;

        const loadOrders = async () => {
            try {
                const orders = await getMyOrders(Number(getUserIdFromToken()));
                setOrders(orders);
            } catch {
                setError("Failed to fetch orders");
            }
        };

        loadOrders();
    }, []);

    const handleCancel = async (id: number) => {
        try {
            await cancelOrder(id);
            setOrders(o => o.map(x =>
                x.order_id === id ? { ...x, status: "CANCELLED" } : x
            ));
        } catch {
            setError("Failed to cancel order");
        }
    };

    return { orders, error, handleCancel };
};