import { Link, useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../../enums/routes.enum";
import { getToken } from "../../../utils/authentication.utils";

const LoginAction = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    if (pathname === Routes.LOGIN || pathname === Routes.REGISTER) return null;

    const loggedIn = !!getToken();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate(Routes.ROOT);
    };

    return loggedIn ? (
        <button
            onClick={handleLogout}
            className="text-white text-decoration-none border-0 bg-transparent"
        >
            Logout
        </button>
    ) : (
        <Link
            to={Routes.LOGIN}
            className="text-white text-decoration-none"
        >
            Login
        </Link>
    );
};

export default LoginAction;