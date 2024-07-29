// src/components/Footer/Footer.js

import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container text-center">
                <p>&copy; 2024 Pizza Palace. All rights reserved.</p>
                <p>Follow us on social media: 
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> | 
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
