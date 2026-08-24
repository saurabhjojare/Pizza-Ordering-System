import { Link } from "react-router-dom";
import { useSignUp } from "./sign-up.use";
import { Routes } from "../../../common/enums/routes.enum";
import { useRedirectIfUserAuthenticated } from "../../../common/utils/authentication.utils";

const SignUp = () => {
  useRedirectIfUserAuthenticated(Routes.MY_PROFILE);
  const { formData, error, handleChange, handleSubmit } = useSignUp();

  return (
    <div className="container py-4" style={{ maxWidth: 500 }}>
      <h2 className="text-center mb-4">Sign Up</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              name="first_name"
              placeholder="Robert"
              className="form-control"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="last_name"
              placeholder="Brown"
              className="form-control"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <input
          name="email_address"
          type="email"
          placeholder="robert.brown@example.com"
          className="form-control mb-3"
          value={formData.email_address}
          onChange={handleChange}
          required
        />

        <input
          name="phone_number"
          placeholder="+91 9876543210"
          className="form-control mb-3"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="123 Main St, San Jose, CA 95112"
          className="form-control mb-3"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-4">
            <input
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="btn btn-light w-100">Sign Up</button>
      </form>

      <p className="text-center mt-3 mb-0">
        Already have an account?{" "}
        <Link to="/login" className="text-decoration-none">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;