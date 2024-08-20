import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; 

const Navbar: React.FC = () => {
    const location = useLocation();

    // Define admin-related paths excluding '/add-pizza'
    const adminPaths = ['/admin', '/pizza', '/customer'];
    const isAdminPage = adminPaths.includes(location.pathname);
    
    // Determine if we are on '/add-pizza'
    const isAddPizzaPage = location.pathname === '/add-pizza';

    return (
        <div className='container-fluid container-with-navbar'>
            <div className='navbar d-flex justify-content-center mt-4'>
                <ul className="nav nav-pills">
                    {/* Show admin links unless on '/add-pizza' */}
                    {isAdminPage && !isAddPizzaPage ? (
                        <>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/pizza' ? 'active' : ''}`}
                                    to="/pizza"
                                >
                                    Pizza
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/customer' ? 'active' : ''}`}
                                    to="/customer"
                                >
                                    Customer
                                </Link>
                            </li>
                        </>
                    ) : !isAddPizzaPage ? (
                        <>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/order' ? 'active' : ''}`}
                                    to="/order"
                                >
                                    Order
                                </Link>
                            </li>
                        </>
                    ) : null} {/* Render nothing for '/add-pizza' */}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
