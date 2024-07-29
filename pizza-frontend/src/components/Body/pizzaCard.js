// src/components/Body/PizzaCard.js

import React from 'react';
import Toppings from '../Topping/toppings';

const PizzaCard = ({ pizza, selectedSizes, handleSizeChange, selectedToppings, handleToppingChange, addToCart, vegToppings, nonVegToppings }) => {
    return (
        <div className="col-lg-3 col-md-4 mb-4">
            <div className="card">
                <img src={pizza.imageUrl} className="card-img-top" alt={pizza.name} />
                <div className="card-body">
                    <h5 className="card-title">{pizza.name}</h5>
                    <p className="card-description">{pizza.description}</p>
                    <div className="form-group">
                        <label htmlFor={`size-select-${pizza.pizza_id}`}>Select size:</label>
                        <select
                            id={`size-select-${pizza.pizza_id}`}
                            className="form-control"
                            onChange={(e) => handleSizeChange(pizza.pizza_id, e.target.value)}
                        >
                            <option value="">Choose...</option>
                            <option value="regular">Regular - ₹{pizza.regularPrice}</option>
                            <option value="medium">Medium - ₹{pizza.mediumPrice}</option>
                            <option value="large">Large - ₹{pizza.largePrice}</option>
                        </select>
                    </div>
                    <Toppings
                        toppings={pizza.type === 'Vegetarian' ? vegToppings : nonVegToppings}
                        selectedToppings={selectedToppings[pizza.pizza_id] || []}
                        onSelectTopping={(topping) => handleToppingChange(pizza.pizza_id, topping)}
                    />
                    <button
                        className="add-to-cart-btn"
                        onClick={() => {
                            const size = selectedSizes[pizza.pizza_id];
                            if (size) {
                                addToCart(pizza);
                            } else {
                                alert('Please select a size.');
                            }
                        }}
                        disabled={!selectedSizes[pizza.pizza_id]}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaCard;
