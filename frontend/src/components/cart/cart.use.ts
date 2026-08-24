import { useEffect, useState } from "react";
import { Cart } from "../../common/interfaces/cart.interface";
import { getUserIdFromToken, useRequireAuth } from "../../common/utils/authentication.utils";
import { Routes } from "../../common/enums/routes.enum";
import { Labels } from "../../common/enums/labels.enums";
import { deleteCartItem, getUserCart } from "../../common/services/cart.service";


export const useGetCart = () => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [removing, setRemoving] = useState<number | null>(null);
    useRequireAuth(Routes.LOGIN);

    useEffect(() => {
        document.title = Labels.CART;

        getUserCart(Number(getUserIdFromToken()))
            .then(setCart)
            .catch(() => setError("Failed to fetch cart"));
    }, []);

    const removeItem = async (cartId: number) => {
        try {
            setRemoving(cartId);
            await deleteCartItem(cartId);

            setTimeout(() => {
                setCart(cart => cart.filter(item => item.cart_id !== cartId));
                setRemoving(null);
            }, 500);
        } catch {
            setRemoving(null);
            setError("Failed to remove item");
        }
    };

    return { cart, setCart, error, removing, removeItem };
};