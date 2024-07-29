import React from 'react';
import './orderLine.css';

function OrderLine({ item, addToCart, decreaseQuantity, removeFromCart }) {
    return (
        <li className="order-line">
            <div className="order-line-info">
                {item.name} - {item.quantity} pcs - ${item.regularPrice * item.quantity}
            </div>
            <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => decreaseQuantity(item)}>-</button>
                <span className="quantity">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => addToCart(item)}>+</button>
            </div>
            <button className="remove-from-cart-btn" onClick={() => removeFromCart(item)}>
                Remove
            </button>
        </li>
    );
}

export default OrderLine;
