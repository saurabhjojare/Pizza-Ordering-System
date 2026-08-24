import { Link, useLocation } from "react-router-dom";
import { Routes } from "../../../enums/routes.enum";
import { getToken } from "../../../utils/authentication.utils";

const ProfileAction = () => {
    const { pathname } = useLocation();

    if (!getToken() || pathname === Routes.MY_PROFILE || pathname == Routes.UPDATE_PROFILE) return null;

    return (
        <Link
            to={Routes.MY_PROFILE}
            className="text-white text-decoration-none"
        >
            My Profile
        </Link>
    );
};

export default ProfileAction;