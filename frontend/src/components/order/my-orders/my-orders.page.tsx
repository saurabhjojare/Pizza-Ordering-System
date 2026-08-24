import { useMyOrders } from "./my-orders.use";

const MyOrders = () => {
    const { orders, error, handleCancel } = useMyOrders();

    if (error)
        return <p className="text-center text-danger mt-4">{error}</p>;

    if (!orders.length)
        return (
            <div className="text-center py-4">
                <h6>No orders yet</h6>
                <small className="text-muted">Your orders will appear here.</small>
            </div>
        );

    return (
        <div className="container py-3">
            <div className="card border rounded-3 shadow-sm mx-auto" style={{ maxWidth: 600 }}>
                <div className="card-body p-3">
                    <div className="d-flex justify-content-between border-bottom pb-2">
                        <h6 className="mb-0">Order History</h6>
                        <small className="text-muted">{orders.length} Orders</small>
                    </div>

                    {orders.map((order, i) => (
                        <div key={order.order_id} className={`py-3 ${i ? "border-top" : ""}`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-semibold">Order #{order.order_id}</span>

                                    <span className={`badge ${order.status === "CANCELLED"
                                        ? "text-bg-danger"
                                        : order.status === "DELIVERED"
                                            ? "text-bg-success"
                                            : "text-bg-primary"
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-bold">
                                        ₹{Number(order.orderLines.reduce((sum, line) => sum + Number(line.line_total), 0)).toFixed(2)}
                                    </span>

                                    {order.status === "PLACED" && (
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleCancel(order.order_id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>

                            <small className="text-muted">
                                {new Date(order.created_at).toLocaleDateString()} ·{" "}
                                {order.orderLines.length} item
                                {order.orderLines.length !== 1 ? "s" : ""}
                            </small>

                            <div className="mt-2">
                                {order.orderLines.map(line => (
                                    <div
                                        key={line.order_line_id}
                                        className="d-flex align-items-center gap-2 py-2"
                                    >
                                        <img
                                            src={line.pizza.imageUrl}
                                            alt={line.pizza.name}
                                            width="45"
                                            height="45"
                                            className="rounded-2 object-fit-cover"
                                        />

                                        <div className="flex-grow-1">
                                            <div className="fw-semibold small">
                                                {line.pizza.name} × {line.quantity}
                                            </div>

                                            <span className={`badge ${line.pizza.type === "Vegetarian"
                                                ? "text-bg-success"
                                                : "text-bg-danger"
                                                }`}>
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

export default MyOrders;