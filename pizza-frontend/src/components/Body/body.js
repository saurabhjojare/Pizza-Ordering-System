// src/components/Body/body.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './body.css';
import PizzaCard from './pizzaCard';
import Cart from './cart';

const vegToppings = [
    { id: 1, name: 'Bell Peppers', price: 20 },
    { id: 2, name: 'Onions', price: 15 },
    { id: 3, name: 'Tomatoes', price: 25 },
    { id: 4, name: 'Mushrooms', price: 30 },
];

const nonVegToppings = [
    { id: 5, name: 'Pepperoni', price: 50 },
    { id: 6, name: 'Sausage', price: 45 },
    { id: 7, name: 'Bacon', price: 60 },
    { id: 8, name: 'Ham', price: 55 },
];

function Body() {
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [selectedToppings, setSelectedToppings] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/pizzas')
            .then(response => {
                setPizzas(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pizza data!', error);
            });
    }, []);

    const addToCart = (pizza) => {
        const size = selectedSizes[pizza.pizza_id];
        const price = pizza[`${size}Price`];
        const toppings = selectedToppings[pizza.pizza_id] || [];

        const toppingPrice = toppings.reduce((total, toppingName) => {
            const topping = [...vegToppings, ...nonVegToppings].find(t => t.name === toppingName);
            return total + (topping ? topping.price : 0);
        }, 0);

        const existingPizza = cart.find(item => item.pizza_id === pizza.pizza_id && item.size === size);

        if (existingPizza) {
            setCart(cart.map(item =>
                item.pizza_id === pizza.pizza_id && item.size === size
                    ? { ...item, quantity: item.quantity + 1, toppings: [...item.toppings, ...toppings], toppingPrice: item.toppingPrice + toppingPrice }
                    : item
            ));
        } else {
            setCart([...cart, { ...pizza, size, price: parseFloat(price), quantity: 1, toppings, toppingPrice }]);
        }

        alert(`${pizza.name} (${size}) with ${toppings.length > 0 ? toppings.join(', ') : 'no'} toppings added to cart!`);
    };

    const removeFromCart = (pizza) => {
        setCart(cart.filter(item => item.pizza_id !== pizza.pizza_id || item.size !== pizza.size));
       // alert(`${pizza.name} (${pizza.size}) removed from cart!`);
    };

    const updateQuantity = (pizza, delta) => {
        const updatedCart = cart.map(item =>
            item.pizza_id === pizza.pizza_id && item.size === pizza.size
                ? { ...item, quantity: item.quantity + delta }
                : item
        ).filter(item => item.quantity > 0);
        setCart(updatedCart);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price) + parseFloat(item.toppingPrice)) * item.quantity, 0).toFixed(2);
    };

    const handleSizeChange = (pizzaId, size) => {
        setSelectedSizes({ ...selectedSizes, [pizzaId]: size });
    };

    const handleToppingChange = (pizzaId, topping) => {
        setSelectedToppings(prevState => {
            const currentToppings = prevState[pizzaId] || [];
            if (currentToppings.includes(topping)) {
                return { ...prevState, [pizzaId]: currentToppings.filter(t => t !== topping) };
            } else {
                return { ...prevState, [pizzaId]: [...currentToppings, topping] };
            }
        });
    };

    return (
        <div className="container mt-4">
            <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                calculateTotal={calculateTotal}
                vegToppings={vegToppings}
                nonVegToppings={nonVegToppings}
            />
            <div className="row">
                {pizzas.map((pizza) => (
                    <PizzaCard
                        key={pizza.pizza_id}
                        pizza={pizza}
                        selectedSizes={selectedSizes}
                        handleSizeChange={handleSizeChange}
                        selectedToppings={selectedToppings}
                        handleToppingChange={handleToppingChange}
                        addToCart={addToCart}
                        vegToppings={vegToppings}
                        nonVegToppings={nonVegToppings}
                    />
                ))}
            </div>
        </div>
    );
}

export default Body;
