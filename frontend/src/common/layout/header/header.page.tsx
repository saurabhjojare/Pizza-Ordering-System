import { Link } from "react-router-dom";
import ProfileAction from "./actions/profile-action";
import OrderAction from "./actions/order-action";
import CartAction from "./actions/cart-action";
import LoginAction from "./actions/login-action";
import { Routes } from "../../enums/routes.enum";

const Header = () => (
  <header className="position-fixed top-0 start-0 w-100 bg-dark text-white px-3 py-3" style={{ zIndex: 1000, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center">
      <Link to={Routes.ROOT} className="text-decoration-none text-white fw-light fs-4 dancing-script">
        Pizza Palace
      </Link>
      <div className="d-flex align-items-center gap-4 mt-3 mt-md-0">
        <ProfileAction />
        <OrderAction />
        <CartAction />
        <LoginAction />
      </div>
    </div>
  </header>
);

export default Header;