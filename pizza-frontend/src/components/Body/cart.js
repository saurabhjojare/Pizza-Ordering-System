import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerList from '../Customer/customerList';
import './cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, calculateTotal, vegToppings, nonVegToppings }) => {
    const [showCustomerList, setShowCustomerList] = useState(false);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (showCustomerList) {
            axios.get('http://localhost:5000/api/v1/customers')
                .then(response => {
                    setCustomers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching customers:', error);
                });
        }
    }, [showCustomerList]);

    const getToppingPrice = (toppingName) => {
        const topping = [...vegToppings, ...nonVegToppings].find(t => t.name === toppingName);
        return topping ? topping.price : 0;
    };

    const handlePlaceOrder = () => {
        setShowCustomerList(true);
    };

    const handleCloseOverlay = (e) => {
        if (e.target.className === 'customer-overlay') {
            setShowCustomerList(false);
        }
    };

    const handleSelectCustomer = (customer) => {
        setShowCustomerList(false);
        submitOrder(customer);
    };

    const submitOrder = (customer) => {
        const orderDetails = {
            customer_id: customer.customer_id,
            delivery_address: customer.address,
            total_amount: calculateTotal(),
            status: true, // Assuming status should be true for placed orders
            pizza: cart.map(item => ({
                pizza_id: item.pizza_id,
                size: item.size,
                quantity: item.quantity
            }))
        };

        console.log('Order details being sent:', orderDetails); // Log order details for debugging

        axios.post('http://localhost:5000/api/v1/orders', orderDetails)
            .then(response => {
                alert('Order placed successfully!');
                // Clear the cart or handle success as needed
            })
            .catch(error => {
                console.error('There was an error placing the order!', error.response ? error.response.data : error.message);
                alert('Failed to place order.');
            });
    };

    return (
        <div>
            {cart.length > 0 && (
                <div className="cart mt-4">
                    <h3>Cart</h3>
                    <ul>
                        {cart.map((item) => (
                            <li key={`${item.pizza_id}-${item.size}`} className="cart-item">
                                <div className="cart-item-details">
                                    {item.name} ({item.size}) - ₹{parseFloat(item.price).toFixed(2)} x {item.quantity}
                                    {item.toppings.length > 0 && (
                                        <div>
                                            Toppings: {item.toppings.map(topping => `${topping} (₹${getToppingPrice(topping).toFixed(2)})`).join(', ')}
                                        </div>
                                    )}
                                    <div>Total: ₹{((parseFloat(item.price) + parseFloat(item.toppingPrice)) * item.quantity).toFixed(2)}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <button className="quantity-btn" onClick={() => updateQuantity(item, -1)}>-</button>
                                    <button className="quantity-btn" onClick={() => updateQuantity(item, 1)}>+</button>
                                    <button className="remove-from-cart-btn" onClick={() => removeFromCart(item)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total-amount">
                        Total: ₹{calculateTotal()}
                    </div>
                    <div className='text-end mt-2'>
                        <button className="place-order-btn btn btn-success w-25 w-sm-50 w-md-50 w-lg-75 w-xl-100" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            )}
            {showCustomerList && (
                <div className="customer-overlay" onClick={handleCloseOverlay}>
                    <CustomerList customers={customers} onSelectCustomer={handleSelectCustomer} />
                </div>
            )}
        </div>
    );
};

export default Cart;
