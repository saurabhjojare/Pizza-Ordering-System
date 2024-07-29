// src/components/Order/OrderList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './orderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-list">
      <h3>Order List</h3>
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.order_id} className="list-group-item">
              <h5>Order ID: {order.order_id}</h5>
              <p>Customer ID: {order.customer_id}</p>
              <p>Delivery Address: {order.delivery_address}</p>
              <p>Total Amount: ₹{order.total_amount}</p>
              <p>Status: {order.status ? 'Confirmed' : 'Pending'}</p>
              <p>Order Time: {new Date(order.order_time).toLocaleString()}</p>
              <h6>Order Lines:</h6>
              <ul>
                {order.orderLines.map(orderLine => (
                  <li key={orderLine.orderline_id}>
                    Pizza ID: {orderLine.pizza_id}, Size: {orderLine.size}, Quantity: {orderLine.quantity}, Total Amount: ₹{orderLine.total_amount}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
