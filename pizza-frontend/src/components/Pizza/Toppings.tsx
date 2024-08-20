// Toppings.tsx
import React from 'react';

export type Topping = {
  name: string;
  price: number;
  type: 'veg' | 'non-veg';  // Include the type of topping
};

export type Crust = {
  name: string;
  price: number;
};

export const vegToppings: Topping[] = [
  { name: 'Tomato', price: 30, type: 'veg' },
  { name: 'Capsicum', price: 40, type: 'veg' },
  { name: 'Paneer', price: 50, type: 'veg' },
];

export const nonVegToppings: Topping[] = [
  { name: 'Chicken', price: 60, type: 'non-veg' },
  { name: 'Pepperoni', price: 70, type: 'non-veg' },
  { name: 'Sausage', price: 80, type: 'non-veg' },
];

export const crusts: Crust[] = [
  { name: "Thin Crust", price: 50 },
  { name: "Cheese Burst", price: 100 },
  { name: "Stuffed Crust", price: 80 },
  { name: "Pan Pizza", price: 70 },
];

interface ToppingsProps {
  availableToppings: Topping[];
  selectedToppings: Topping[];
  handleToppingChange: (topping: Topping) => void;
}

const Toppings: React.FC<ToppingsProps> = ({ availableToppings, selectedToppings, handleToppingChange }) => {
  return (
    <div className='mb-3'>
      <label className='form-label'>Toppings</label>
      <div>
        {availableToppings.map((topping) => (
          <div key={topping.name} className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id={`topping-${topping.name}`}
              checked={selectedToppings.includes(topping)}
              onChange={() => handleToppingChange(topping)}
            />
            <label className='form-check-label' htmlFor={`topping-${topping.name}`}>
              {topping.name} - ₹{topping.price}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;
