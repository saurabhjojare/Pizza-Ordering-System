import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const location = useLocation(); 

    const hideAdminLinkPaths = ['/admin', '/pizza', '/customer', '/add-pizza'];
    const shouldHideAdminLink = hideAdminLinkPaths.includes(location.pathname);

    return (
        <header className="header">
            <Link to="/" className="display-6 text-decoration-none text-white">
                <h2 className='fw-light'>Pizza Palace</h2>
            </Link>
            
            {location.pathname === '/pizza' && (
                <Link to="/add-pizza" className="btn text-white">
                    Add Pizza
                </Link>
            )}

            {location.pathname === '/add-pizza' ? (
                <Link to="/pizza" className="btn text-white">
                    Back
                </Link>
            ) : (
                !shouldHideAdminLink && (
                    <a href="/admin" className="admin-link text-decoration-none h5 fw-light me-3">
                        Admin
                    </a>
                )
            )}
        </header>
    );
};

export default Header;
