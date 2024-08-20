// AddToCart.tsx
import React, { useState } from 'react';
import { Pizza } from './GetPizza';
import { vegToppings, nonVegToppings, crusts, Topping, Crust } from './Toppings';
import Quantity from './Quantity';
import Size from './Size';
import CrustComponent from './Crust';
import ToppingsComponent from './Toppings';

interface AddToCartProps {
  pizza: Pizza;
  addToCart: (pizza: Pizza, size: string, quantity: number, crust: Crust, selectedToppings: Topping[]) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ pizza, addToCart }) => {
  const [size, setSize] = useState<string>('regular');
  const [quantity, setQuantity] = useState<number>(1);
  const [crust, setCrust] = useState<Crust>(crusts[0]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleAddToCart = () => {
    addToCart(pizza, size, quantity, crust, selectedToppings);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleToppingChange = (topping: Topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const availableToppings = pizza.type === 'Vegetarian' ? vegToppings : nonVegToppings;

  return (
    <div>
      <Size size={size} setSize={setSize} pizza={pizza} />
      <CrustComponent crust={crust} setCrust={setCrust} crusts={crusts} />

      <ToppingsComponent
        availableToppings={availableToppings}
        selectedToppings={selectedToppings}
        handleToppingChange={handleToppingChange}
      />

      <Quantity quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
      
      <button className='btn btn-primary' onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
