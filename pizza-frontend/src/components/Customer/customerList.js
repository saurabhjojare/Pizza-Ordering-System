import React, { useEffect } from 'react';
import './customerList.css'; // Ensure the correct CSS file import

const CustomerList = ({ customers = [], onSelectCustomer, onClose }) => {

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains('customer-overlay')) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="customer-overlay">
            <div className="customer-list p-4 bg-white rounded shadow">
                <h3 className="text-center mb-4">Select Customer</h3>
                <ul className="list-group">
                    {customers.map(customer => (
                        <li key={customer.customer_id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {customer.first_name} {customer.last_name}
                            </div>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => onSelectCustomer(customer)}>
                                Select
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomerList;
