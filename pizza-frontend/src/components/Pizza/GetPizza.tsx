import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddToCart from '../Pizza/AddToCart';
import Cart from '../Pizza/Cart';
import { Crust, Topping } from './Toppings';

export interface Pizza {
  pizza_id: number;
  name: string;
  type: 'Vegetarian' | 'Non-Vegetarian';
  imageUrl: string;
  description: string;
  regularPrice: string;
  mediumPrice: string;
  largePrice: string;
}

interface CartItem {
  pizza: Pizza;
  size: string;
  quantity: number;
  crust: Crust;
  selectedToppings: Topping[];
  totalAmount: number;
}

const GetPizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/pizzas');
        setPizzas(response.data.Data);
      } catch (err) {
        setError('Failed to fetch pizza');
      }
    };
    fetchPizzas();
  }, []);

  const addToCart = (
    pizza: Pizza,
    size: string,
    quantity: number,
    crust: Crust,
    selectedToppings: Topping[]
  ) => {
    const price =
      size === 'regular'
        ? Number(pizza.regularPrice)
        : size === 'medium'
        ? Number(pizza.mediumPrice)
        : Number(pizza.largePrice);

    const toppingsPrice = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    const itemPrice = price + crust.price + toppingsPrice;
    const totalAmount = itemPrice * quantity;

    setCartItems((prevItems) => [
      ...prevItems,
      { pizza, size, quantity, crust, selectedToppings, totalAmount },
    ]);
  };

  const removeFromCart = (index: number) => {
    const newCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity;
      const price =
        updatedItems[index].size === 'regular'
          ? Number(updatedItems[index].pizza.regularPrice)
          : updatedItems[index].size === 'medium'
          ? Number(updatedItems[index].pizza.mediumPrice)
          : Number(updatedItems[index].pizza.largePrice);

      const toppingsPrice = updatedItems[index].selectedToppings.reduce(
        (sum, topping) => sum + topping.price,
        0
      );

      updatedItems[index].totalAmount =
        (price + updatedItems[index].crust.price + toppingsPrice) * newQuantity;

      return updatedItems;
    });
  };

  if (error) {
    return (
      <div className="text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-3">
      {cartItems.length > 0 && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
        />
      )}
    
      <h1 className="text-center mb-4">Pizza Menu</h1>
      <div className="row justify-content-center">
        {pizzas.map((pizza) => (
          <div key={pizza.pizza_id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img src={pizza.imageUrl} className="card-img-top" alt={pizza.name} />
              <div className="card-body">
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">{pizza.description}</p>
                <p className="card-text">
                  <strong>Type:</strong> {pizza.type}
                </p>
                <p className="card-text">
                  <strong>Regular Price:</strong> ${pizza.regularPrice}
                </p>
                <p className="card-text">
                  <strong>Medium Price:</strong> ${pizza.mediumPrice}
                </p>
                <p className="card-text">
                  <strong>Large Price:</strong> ${pizza.largePrice}
                </p>
                <AddToCart pizza={pizza} addToCart={addToCart} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetPizza;
