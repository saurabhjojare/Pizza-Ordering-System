import { useEffect } from "react";
import { useUpdateUserProfile } from "./update-profile.use";
import { Labels } from "../../../common/enums/labels.enums";

const fields = [
  ["first_name", "First Name", "text"],
  ["last_name", "Last Name", "text"],
  ["email_address", "Email", "email"],
  ["phone_number", "Phone", "text"],
  ["address", "Address", "text"],
] as const;

const UpdateProfile = () => {
  const { user, error, handleChange, handleSubmit } = useUpdateUserProfile();

  useEffect(() => {
    document.title = Labels.UPDATE_PROFILE;
  }, []);

  if (error) return <p className="text-center text-danger mt-4">{error}</p>;
  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container py-4">
      <div className="card border rounded-3 shadow-sm mx-auto" style={{ maxWidth: 500 }}>
        <div className="card-body p-4">
          <h4 className="text-center mb-4">{Labels.UPDATE_PROFILE}</h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {fields.map(([name, label, type]) => (
                <div
                  className={name === "first_name" || name === "last_name" ? "col-6" : "col-12"}
                  key={name}
                >
                  <label className="form-label small text-muted mb-0">
                    {label}
                  </label>
                  <input
                    name={name}
                    type={type}
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                    value={user[name] ?? ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light btn-sm px-4 border"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-outline-primary btn-sm px-4"
                onClick={e => !window.confirm("Update your profile?") && e.preventDefault()}
              >
                {Labels.UPDATE_PROFILE}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;