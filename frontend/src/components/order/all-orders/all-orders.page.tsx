import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";
import { useAllOrders } from "./all-orders.use";

const AllOrders = () => {
    const { orders, error, handleDeliver } = useAllOrders();
    const navigate = useNavigate();

    if (error)
        return <p className="text-center text-danger mt-4">{error}</p>;

    if (!orders.length)
        return (
            <div className="text-center py-4">
                <h6>No orders found</h6>
            </div>
        );

    return (
        <div className="container py-3">
            <div
                className="card border rounded-3 shadow-sm mx-auto"
                style={{ maxWidth: 700 }}
            >
                <div className="card-body p-3">
                    <div className="d-flex align-items-center border-bottom pb-2">
                        <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => navigate(Routes.DASHBOARD)}
                        >
                            <i className="bi bi-arrow-left"></i>

                        </button>

                        <h6 className="mb-0">Order Center</h6>

                        <small className="text-muted ms-auto">
                            {orders.length} Orders
                        </small>
                    </div>

                    {orders.map((order, i) => (
                        <div
                            key={order.order_id}
                            className={`py-3 ${i ? "border-top" : ""}`}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fw-semibold">
                                            Order #{order.order_id}
                                        </span>

                                        <span
                                            className={`badge ${order.status === "CANCELLED"
                                                ? "text-bg-danger"
                                                : order.status === "DELIVERED"
                                                    ? "text-bg-success"
                                                    : "text-bg-primary"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="mt-2 small">
                                        <div className="fw-semibold">
                                            {order.user.first_name} {order.user.last_name}
                                        </div>
                                        <div className="text-muted">
                                            {order.user.email_address}
                                        </div>
                                        <div className="text-muted">
                                            {order.user.phone_number}
                                        </div>
                                        <div className="text-muted text-break">
                                            {order.user.address}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <div className="fw-bold">
                                        ₹{Number(order.orderLines.reduce((sum, line) => sum + Number(line.line_total), 0)).toFixed(2)}
                                    </div>

                                    {order.status === "PLACED" && (
                                        <button
                                            className="btn btn-outline-success btn-sm mt-2"
                                            onClick={() => handleDeliver(order.order_id)}
                                        >
                                            Delivered
                                        </button>
                                    )}
                                </div>
                            </div>

                            <small className="text-muted">
                                {new Date(order.created_at).toLocaleDateString()}
                            </small>

                            <div className="mt-2">
                                {order.orderLines.map((line) => (
                                    <div
                                        key={line.order_line_id}
                                        className="d-flex align-items-center gap-2 py-1"
                                    >
                                        <img
                                            src={line.pizza.imageUrl}
                                            alt={line.pizza.name}
                                            width="42"
                                            height="42"
                                            className="rounded-2 object-fit-cover"
                                        />

                                        <div className="flex-grow-1 small">
                                            <div className="fw-semibold">
                                                {line.pizza.name} × {line.quantity}
                                            </div>

                                            <span
                                                className={`badge ${line.pizza.type === "Vegetarian"
                                                    ? "text-bg-success"
                                                    : "text-bg-danger"
                                                    }`}
                                            >
                                                {line.pizza.type}
                                            </span>
                                        </div>

                                        <span className="small fw-semibold">
                                            ₹{Number(line.line_total).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllOrders;