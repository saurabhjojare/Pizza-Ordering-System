import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();

    // Determine if the current path is one of the admin-related paths
    const adminPaths = ['/admin', '/pizza', '/customer'];
    const isAdminPage = adminPaths.includes(location.pathname);

    return (
        <div className='container-fluid'>
            <div className='navbar d-flex justify-content-center mt-4'>
                <ul className="nav nav-pills">
                    {isAdminPage ? (
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
                    ) : (
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
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
