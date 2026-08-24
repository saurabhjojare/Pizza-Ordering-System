import { useState } from "react";
import { Cart } from "../../../common/interfaces/cart.interface";
import { getUserById } from "../../../common/services/user.service";
import { getUserIdFromToken } from "../../../common/utils/authentication.utils";
import { placeOrder } from "../../../common/services/order.service";


export const useOrderConfirmation = (
    cart: Cart[],
    setCart: React.Dispatch<React.SetStateAction<Cart[]>>,
    onSuccess: () => void
) => {
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePlaceOrder = async () => {
        try {
            setPlacing(true);

            const user = await getUserById(Number(getUserIdFromToken()));
            console.log(
                cart.map(({ pizza_id, quantity }) => ({ pizza_id, quantity }))
            );

            await placeOrder({
                user_id: user.user_id,
                delivery_address: user.address,
                orderLines: cart.map(({ pizza_id, quantity }) => ({
                    pizza_id,
                    quantity,
                })),
            });

            console.log(cart);

            setCart([]);
            onSuccess();
        } catch {
            setError("Failed to place order");
        } finally {
            setPlacing(false);
        }
    };

    return { placing, error, handlePlaceOrder };
};