import { useEffect } from "react";
import { Labels } from "../../../common/enums/labels.enums";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";
import { useYourProfile } from "./my-profile.use";
import { useRequireAuth } from "../../../common/utils/authentication.utils";

const MyProfile = () => {
  useRequireAuth(Routes.LOGIN);
  const navigate = useNavigate();

  const { user, error, handleDelete } = useYourProfile();

  useEffect(() => {
    document.title = Labels.MY_PROFILE;
  }, []);

  if (error) return <p className="text-center text-danger mt-4">{error}</p>;
  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container py-4">
      <div
        className="card border rounded-3 shadow-sm mx-auto"
        style={{ maxWidth: 500 }}
      >
        <div className="card-body p-4">
          <div className="text-center">
            <div className="text-muted small mb-1">
              {user.role.charAt(0).toUpperCase() +
                user.role.slice(1).toLowerCase()}
            </div>

            <h4 className="mb-3">
              {user.first_name} {user.last_name}
            </h4>
          </div>

          <div className="mb-3">
            {[
              ["Email", user.email_address],
              ["Phone", user.phone_number],
              ["Address", user.address],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`p-2 px-3 ${index ? "border-top" : ""}`}
              >
                <div className="text-muted small">{label}</div>
                <div className="fw-medium text-break">{value}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm px-4"
              onClick={() => navigate(Routes.UPDATE_PROFILE)}
            >
              Update Profile
            </button>

            <div className="mt-2">
              <button
                type="button"
                className="btn btn-link btn-sm text-danger text-decoration-none"
                onClick={() => {
                  if (window.confirm("Delete permanently?")) handleDelete();
                }}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;