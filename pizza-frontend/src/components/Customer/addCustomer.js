import React, { useState } from 'react';
import axios from 'axios';
import './addCustomer.css';

const AddCustomer = ({ onAddCustomer }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        email_address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/customers', formData)
            .then(response => {
                onAddCustomer(response.data);
                setFormData({
                    first_name: '',
                    last_name: '',
                    address: '',
                    phone_number: '',
                    email_address: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the customer!', error);
            });
    };

    return (
        <div className="add-customer-container">
            <h2>Add Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        className="form-control"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email_address">Email Address</label>
                    <input
                        type="email"
                        id="email_address"
                        name="email_address"
                        className="form-control"
                        value={formData.email_address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;
