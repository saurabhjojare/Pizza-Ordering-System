import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customer.css';
import AddCustomer from './addCustomer';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('http://localhost:5000/api/v1/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customer data!', error);
            });
    };

    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setShowAddCustomerForm(false); // Hide form after adding a customer
    };

    const toggleAddCustomerForm = () => {
        setShowAddCustomerForm(!showAddCustomerForm);
    };

    const handleDeleteCustomer = (customerId) => {
        axios.delete(`http://localhost:5000/api/v1/customers/${customerId}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.customer_id !== customerId));
            })
            .catch(error => {
                console.error('There was an error deleting the customer!', error);
            });
    };

    return (
        <div className="customer-container">
            <h2 className='text-center'>Customers</h2>
            <div className='customer-list'>
                <button className="btn btn-primary mb-3" onClick={toggleAddCustomerForm}>
                    {showAddCustomerForm ? 'Hide Form' : 'Add Customer'}
                </button>
                
                {showAddCustomerForm && <AddCustomer onAddCustomer={handleAddCustomer} />}
            </div>
            {customers.length > 0 ? (
                <ul className="customer-list">
                    {customers.map((customer) => (
                        <li key={customer.customer_id} className="customer-item">
                            <div>
                                <strong>Name:</strong> {customer.first_name} {customer.last_name}
                            </div>
                            <div>
                                <strong>Address:</strong> {customer.address}
                            </div>
                            <div>
                                <strong>Phone:</strong> {customer.phone_number}
                            </div>
                            <div>
                                <strong>Email:</strong> {customer.email_address}
                            </div>
                            <button className="text-decoration-none text-center mt-2 w-25" onClick={() => handleDeleteCustomer(customer.customer_id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No customers found.</p>
            )}
        </div>
    );
};

export default Customer;
