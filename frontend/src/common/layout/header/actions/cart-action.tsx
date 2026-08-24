import { Link, useLocation } from "react-router-dom";
import { Routes } from "../../../enums/routes.enum";
import { getToken } from "../../../utils/authentication.utils";

const CartAction = () => {
    const { pathname } = useLocation();

    if (pathname === Routes.LOGIN || pathname === Routes.REGISTER || pathname == Routes.CART) return null;

    return getToken() ? (
        <Link
            to={Routes.CART}
            className="text-white text-decoration-none"
        >
            Cart
        </Link>
    ) : null;
};

export default CartAction;