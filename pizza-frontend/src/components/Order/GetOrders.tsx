import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pizza } from '../Pizza/GetPizza';

interface OrderLine {
  orderline_id: number;
  order_id: number;
  pizza_id: number;
  size: string;
  quantity: number;
  total_amount: number;
}

interface Order {
  order_id: number;
  status: boolean;
  total_amount: string;
  order_time: string;
  customer_id: number;
  delivery_address: string;
  orderLines: OrderLine[];
}

const GetOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pizzas, setPizzas] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Order';
  }, []);

  useEffect(() => {
    const fetchOrdersAndPizzas = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:5000/api/v1/orders');
        setOrders(ordersResponse.data.Data);

        const pizzasResponse = await axios.get('http://localhost:5000/api/v1/pizzas');
        const pizzaData: Pizza[] = pizzasResponse.data.Data;

        const pizzaMap = new Map<number, string>();
        pizzaData.forEach((pizza: Pizza) => {
          pizzaMap.set(pizza.pizza_id, pizza.name);
        });
        setPizzas(pizzaMap);
      } catch (err) {
        setError('Failed to fetch orders');
      }
    };
    fetchOrdersAndPizzas();
  }, []);

  const handleCancel = async (orderId: number) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/orders/${orderId}`, {
        status: false,
      });
      setOrders(orders.map(order =>
        order.order_id === orderId ? { ...order, status: false } : order
      ));
    } catch (err) {
      setError('Failed to cancel order');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-GB'),
      time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (error) {
    return (
      <div className="text-center" role="alert">
        {error}
      </div>
    );
  }

  const reversedOrders = [...orders].reverse();

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-4">Order List</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Total Amount</th>
              <th>Order Time</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reversedOrders.map((order) => {
              const { date, time } = formatDate(order.order_time);
              return (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.orderLines.map((line) => (
                      <div key={line.orderline_id}>
                        {pizzas.get(line.pizza_id)}<br />
                        Size: {line.size}<br />
                        Quantity: {line.quantity}
                      </div>
                    ))}
                  </td>
                  <td>${order.total_amount}</td>
                  <td>
                    <div>Date: {date}</div>
                    <div>Time: {time}</div>
                  </td>
                  <td>{order.delivery_address}</td>
                  <td>
                    {order.status ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(order.order_id)}
                      >Cancel
                      </button>
                    ) : (
                      <span className="text-muted">Canceled</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetOrders;
