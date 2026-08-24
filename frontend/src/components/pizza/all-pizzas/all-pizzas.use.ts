import { useEffect, useState } from "react";
import { Pizza } from "../../../common/interfaces/pizza.interface";
import { deletePizza, fetchPizzas } from "../../../common/services/pizza.service";
import { getUserIdFromToken } from "../../../common/utils/authentication.utils";
import { addToCart } from "../../../common/services/cart.service";
import { Labels } from "../../../common/enums/labels.enums";

export const useAllPizzas = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [added, setAdded] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {

    document.title = Labels.PIZZA_PLACE;

    fetchPizzas()
      .then(setPizzas)
      .catch(() => setError("Failed to fetch pizzas"));
  }, []);

  const handleAddToCart = async (pizzaId: number) => {
    try {
      addToCart(Number(getUserIdFromToken()), pizzaId, quantities[pizzaId] || 1);
      setAdded(pizzaId);
      setTimeout(() => setAdded(null), 1500);
    } catch {
      setError("Failed to add pizza to cart");
    }
  };

  const handleDeletePizza = async (pizzaId: number) => {
    try {
      setDeleting(pizzaId);
      deletePizza(pizzaId);

      setTimeout(() => {
        setPizzas(pizzas => pizzas.filter(pizza => pizza.pizza_id !== pizzaId));
        setDeleting(null);
      }, 500);
    } catch {
      setDeleting(null);
      setError("Failed to delete pizza");
    }
  };

  return { pizzas, error, added, deleting, quantities, setQuantities, handleAddToCart, handleDeletePizza };
};