import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";

const OrderConfirmation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate(Routes.ROOT), 6000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container py-5 text-center animate__animated animate__fadeIn">
            <div
                className="card border-0 shadow-sm mx-auto p-4"
                style={{ maxWidth: 450 }}
            >
                <div className="display-4 text-success mb-3">✓</div>
                <h4 className="mb-2">Order Placed</h4>
                <p className="text-muted mb-3">
                    Your order has been placed successfully.
                </p>
                <small className="text-muted">Redirecting to home...</small>
            </div>
        </div>
    );
};

export default OrderConfirmation;