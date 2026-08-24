import { getToken, getUserRoleFromToken } from "../../../common/utils/authentication.utils";
import { useNavigate } from "react-router-dom";
import { useAllPizzas } from "./all-pizzas.use";

const AllPizzas = () => {
  const { pizzas, error, added, deleting, quantities, setQuantities, handleAddToCart, handleDeletePizza } =
    useAllPizzas();
  const navigate = useNavigate();
  const isAuthenticated = !!getToken();
  const isAdmin = getUserRoleFromToken() === "admin";

  if (error) return <p className="text-center text-danger py-4">{error}</p>;

  if (!pizzas.length)
    return <div className="text-center py-4"><h6>No pizzas available</h6></div>;

  return (
    <div className="container-fluid py-3">

      <div className="row g-3">
        {isAdmin && (
          <>
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div
                className="card h-100 border rounded-3 shadow-sm d-flex align-items-center justify-content-center"
                style={{ minHeight: 400, cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
              >
                <div className="text-center text-muted">
                  <div className="fs-1">⌂</div>
                  <h6 className="fw-semibold">Dashboard</h6>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div
                className="card h-100 border rounded-3 shadow-sm d-flex align-items-center justify-content-center"
                style={{ minHeight: 400, cursor: "pointer" }}
                onClick={() => navigate("/add-pizza")}
              >
                <div className="text-center text-muted">
                  <div className="fs-1">+</div>
                  <h6 className="fw-semibold">Add New Pizza</h6>
                </div>
              </div>
            </div>
          </>
        )}

        {pizzas.map((pizza) => {
          const isAdded = added === pizza.pizza_id;

          return (
            <div
              key={pizza.pizza_id}
              className={`col-12 col-sm-6 col-lg-4 col-xl-3 ${deleting === pizza.pizza_id
                ? "animate__animated animate__fadeOut"
                : ""
                }`}
            >
              <div className="card h-100 border rounded-3 shadow-sm overflow-hidden">
                <img
                  src={pizza.imageUrl}
                  alt={pizza.name}
                  height="180"
                  className="card-img-top object-fit-cover"
                />

                <div className="card-body d-flex flex-column p-3">
                  <div className="d-flex justify-content-between mb-1">
                    <h6 className="fw-semibold mb-0">{pizza.name}</h6>

                    <span
                      className={`badge ${pizza.type === "Vegetarian"
                        ? "text-bg-success"
                        : "text-bg-danger"
                        }`}
                    >
                      {pizza.type}
                    </span>
                  </div>

                  <p className="small text-muted flex-grow-1 mb-2">
                    {pizza.description}
                  </p>

                  <div className="fw-bold mb-2">₹{pizza.price}</div>

                  {isAuthenticated && (
                    <div className="d-flex gap-2">
                      <select
                        className="form-select form-select-sm w-auto"
                        value={quantities[pizza.pizza_id] || 1}
                        onChange={e =>
                          setQuantities(q => ({
                            ...q,
                            [pizza.pizza_id]: +e.target.value,
                          }))
                        }
                      >
                        {Array.from({ length: 9 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        className={`btn btn-sm flex-grow-1 ${isAdded ? "btn-success" : "btn-primary"
                          }`}
                        disabled={isAdded}
                        onClick={() =>
                          window.confirm("Add this pizza to your cart?") &&
                          handleAddToCart(pizza.pizza_id)
                        }
                      >
                        {isAdded ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  )}

                  {isAdmin && (
                    <>
                      <button
                        className="btn btn-outline-secondary btn-sm w-100 mt-2"
                        onClick={() => navigate(`/update-pizza/${pizza.pizza_id}`)}
                      >
                        Update Pizza
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm w-100 mt-2"
                        disabled={deleting === pizza.pizza_id}
                        onClick={() =>
                          window.confirm("Delete this pizza?") &&
                          handleDeletePizza(pizza.pizza_id)
                        }
                      >
                        {deleting === pizza.pizza_id
                          ? "Deleting..."
                          : "Delete Pizza"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPizzas;