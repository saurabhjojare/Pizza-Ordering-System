import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";
import { UseAllUsers } from "./all-users.use";

const AllUsers = () => {
    const navigate = useNavigate();
    const { users, error } = UseAllUsers();

    if (error) return <p className="text-center text-danger mt-4">{error}</p>;
    if (!users.length) return <div className="text-center py-4"><h6>No users found</h6></div>;

    return (
        <div className="container py-3">
            <div className="card border rounded-3 shadow-sm mx-auto" style={{ maxWidth: 600 }}>
                <div className="card-body p-3">

                    <div className="d-flex align-items-center border-bottom pb-2 mb-0">
                        <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => navigate(Routes.DASHBOARD)}
                        >
                            <i className="bi bi-arrow-left"></i>

                        </button>

                        <h6 className="mb-0">User Directory</h6>

                        <small className="text-muted ms-auto">
                            {users.length} Accounts
                        </small>
                    </div>

                    {users.map((user, i) => (
                        <div key={user.user_id} className={`py-3 ${i ? "border-top" : ""}`}>
                            <div className="d-flex justify-content-between align-items-start gap-2">
                                <div>
                                    <div className="fw-semibold">
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <small className="text-muted">{user.email_address}</small>
                                </div>

                                <span className={`badge ${user.role === "admin"
                                    ? "text-bg-danger"
                                    : "text-bg-primary"
                                    }`}>
                                    {user.role}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between gap-3 mt-2 small">
                                <span>
                                    <span className="text-muted">Phone </span>
                                    {user.phone_number}
                                </span>

                                <span>
                                    <span className="text-muted">Joined </span>
                                    {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="small mt-1 text-break">
                                <span className="text-muted">Address </span>
                                {user.address || "No address provided"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;