import { useState } from "react";
import { useOrderConfirmation } from "../order/order-confirmation/order-confirmation.use";
import OrderConfirmation from "../order/order-confirmation/order-confirmation.page";
import { useGetCart } from "./cart.use";


const Cart = () => {
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const { cart, setCart, error, removing, removeItem } = useGetCart();
    const { placing, error: orderError, handlePlaceOrder } = useOrderConfirmation(cart, setCart, () => setIsOrderPlaced(true));

    if (error || orderError) return <p className="text-center text-danger mt-4">{error || orderError}</p>;
    if (isOrderPlaced) return <OrderConfirmation />;
    if (!cart.length) return <div className="text-center py-4"><h6>Your cart is empty</h6></div>;

    const total = cart.reduce((sum, item) => sum + Number(item.pizza.price) * item.quantity, 0);

    return (
        <div className="container py-3">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: 600 }}>
                <div className="card-body">
                    <h5>Your Cart</h5>
                    {cart.map((item, index) => (
                        <div key={item.cart_id} className={`d-flex gap-3 align-items-center py-3 ${index ? "border-top" : ""} ${removing === item.cart_id ? "animate__animated animate__zoomOut" : ""}`}>
                            <img src={item.pizza.imageUrl} alt={item.pizza.name} width="64" height="64" className="rounded-2 object-fit-cover" />
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <div><div className="fw-semibold">{item.pizza.name}</div><span className={`badge ${item.pizza.type === "Vegetarian" ? "text-bg-success" : "text-bg-danger"}`}>{item.pizza.type}</span></div>
                                    <span className="fw-semibold">₹{item.pizza.price}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <small className="text-muted">Qty: {item.quantity}</small>
                                    <button className="btn btn-outline-danger btn-sm" disabled={removing === item.cart_id} onClick={() => removeItem(item.cart_id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-between border-top pt-3"><span className="fw-semibold">Total</span><span className="fw-bold">₹{total.toFixed(2)}</span></div>
                    <div className="text-muted small mt-3">
                        Note: The address for this order will be your profile address.
                    </div>
                    <button className="btn btn-primary btn-sm w-100 mt-3" disabled={placing} onClick={() => window.confirm("Place this order?") && handlePlaceOrder()}>
                        {placing ? "Placing..." : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;