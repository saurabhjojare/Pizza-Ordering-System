import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import AddPizza from '../Pizza/AddPizza';

const Header: React.FC = () => {
    const location = useLocation(); // Get current location
    const [showAddPizzaModal, setShowAddPizzaModal] = useState(false);

    // Define paths where the "Admin" link should not be displayed
    const hideAdminLinkPaths = ['/admin', '/pizza', '/customer'];

    // Check if the current path is in the list of paths to hide the "Admin" link
    const shouldHideAdminLink = hideAdminLinkPaths.includes(location.pathname);

    const handleShowAddPizzaModal = () => {
        setShowAddPizzaModal(true);
    };

    const handleCloseAddPizzaModal = () => {
        setShowAddPizzaModal(false);
    };

    return (
        <div>
            <header className="header">
                <Link to="/" className="display-6 text-decoration-none text-white">
                    <h1 className='fw-light'>Pizza Palace</h1>
                </Link>
                {location.pathname === '/pizza' && (
                    <>
                        <button className="btn text-white" onClick={handleShowAddPizzaModal}>
                            Add Pizza
                        </button>
                        <AddPizza show={showAddPizzaModal} onClose={handleCloseAddPizzaModal} />
                    </>
                )}
                {!shouldHideAdminLink ? (
                    <a href="/admin" className="admin-link text-decoration-none">Admin</a>
                ) : null}
            </header>
        </div>
    );
};

export default Header;
