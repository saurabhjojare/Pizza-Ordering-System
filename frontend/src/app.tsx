import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import Login from "./components/user/login/login.page";
import SignUp from "./components/user/sign-up/sign-up.page";
import UpdatePizza from "./components/pizza/update-pizza/update-pizza";
import AddPizza from "./components/pizza/add-pizza/add-pizza.page";
import Header from "./common/layout/header/header.page";
import MyOrders from "./components/order/my-orders/my-orders.page";
import Footer from "./common/layout/footer/footer.page";
import AllOrders from "./components/order/all-orders/all-orders.page";
import AllPizzas from "./components/pizza/all-pizzas/all-pizzas.page";
import MyProfile from "./components/user/my-profile/my-profile.page";
import UpdateProfile from "./components/user/update-profile/update-profile.page";
import AllUsers from "./components/user/all-users/all-users.page";
import Cart from "./components/cart/cart.page";
import Dashboard from "./components/user/dashboard/dashboard.page";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/add-pizza" element={<AddPizza />} />
            <Route path="/update-pizza/:id" element={<UpdatePizza />} />
            <Route path="/" element={<AllPizzas />} />

            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/all-users" element={<AllUsers />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/all-orders" element={<AllOrders />} />

            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
