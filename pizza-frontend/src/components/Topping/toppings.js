// src/components/Topping/toppings.js

import React from 'react';
import './toppings.css';

const Toppings = ({ toppings, selectedToppings, onSelectTopping }) => {
    return (
        <div className="toppings">
            <h5>Select Toppings</h5>
            <div className="topping-options">
                {toppings.map((topping) => (
                    <div key={topping.id} className="form-check">
                        <input
                            type="checkbox"
                            id={`topping-${topping.id}`}
                            className="form-check-input"
                            value={topping.name}
                            checked={selectedToppings.includes(topping.name)}
                            onChange={() => onSelectTopping(topping.name)}
                        />
                        <label htmlFor={`topping-${topping.id}`} className="form-check-label">
                            {topping.name} - ₹{topping.price}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Toppings;
