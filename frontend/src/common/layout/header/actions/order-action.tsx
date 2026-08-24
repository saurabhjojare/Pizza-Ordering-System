import { Link, useLocation } from "react-router-dom";
import { Routes } from "../../../enums/routes.enum";
import { getToken } from "../../../utils/authentication.utils";

const OrderAction = () => {
    const { pathname } = useLocation();

    if (pathname === Routes.LOGIN || pathname === Routes.REGISTER || pathname == Routes.MY_ORDERS) return null;

    return getToken() ? (
        <Link
            to={Routes.MY_ORDERS}
            className="text-white text-decoration-none"
        >
            My Orders
        </Link>
    ) : null;
};

export default OrderAction;