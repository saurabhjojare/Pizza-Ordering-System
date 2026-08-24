import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";
import { getToken, getUserRoleFromToken } from "../../../common/utils/authentication.utils";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getToken() || getUserRoleFromToken() !== "admin") {
            navigate(Routes.ROOT, { replace: true });
        }
    }, [navigate]);

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h4 className="fw-semibold mb-1">Dashboard</h4>
                <p className="text-muted mb-0">
                    Manage orders and customer accounts
                </p>
            </div>

            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <div
                        className="card h-100 border-0 shadow-sm rounded-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(Routes.ALL_ORDERS)}
                    >
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3 mb-3"
                                style={{ width: 52, height: 52 }}>
                                <span className="fs-4 text-primary">☷</span>
                            </div>

                            <h5 className="fw-semibold mb-1">
                                Order Center
                            </h5>

                            <p className="text-muted small mb-4">
                                Review customer orders and update delivery status.
                            </p>

                            <button className="btn btn-outline-primary btn-sm">
                                View Orders
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div
                        className="card h-100 border-0 shadow-sm rounded-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(Routes.ALL_USERS)}
                    >
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-3 mb-3"
                                style={{ width: 52, height: 52 }}>
                                <span className="fs-4 text-success">♙</span>
                            </div>

                            <h5 className="fw-semibold mb-1">
                                User Directory
                            </h5>

                            <p className="text-muted small mb-4">
                                View and manage registered customer accounts.
                            </p>

                            <button className="btn btn-outline-success btn-sm">
                                View Users
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;