import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const location = useLocation();
    
    return (
        <div className='container-fluid'>
            <div className='navbar d-flex justify-content-center'>
                <ul className="nav nav-pills">
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
                            className={`nav-link ${location.pathname === '/pizza' ? 'active' : ''}`}
                            to="/pizza"
                        >
                            Pizza's
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${location.pathname === '/order' ? 'active' : ''}`}
                            to="/order"
                        >
                            Order's
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${location.pathname === '/customer' ? 'active' : ''}`}
                            to="/customer"
                        >
                            Customer's
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
