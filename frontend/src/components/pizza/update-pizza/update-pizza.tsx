import { useNavigate, useParams } from "react-router-dom";
import { useUpdatePizza } from "./update-pizza.use";
import { Pizza } from "../../../common/interfaces/pizza.interface";

const inputClass =
    "form-control form-control-sm border-0 border-bottom rounded-0 px-0 shadow-none";

const UpdatePizza = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { pizza, setPizza, error, saving, saved, update } =
        useUpdatePizza(Number(id));

    if (error) return <p className="text-center text-danger mt-4">{error}</p>;
    if (!pizza) return <p className="text-center mt-4">Loading...</p>;

    return (
        <div className="container py-4">
            <div
                className="card border-0 shadow-sm mx-auto"
                style={{ maxWidth: 500 }}
            >
                <div className="card-body p-3">
                    <h6 className="fw-semibold mb-3">Update Pizza</h6>

                    <input
                        className={`${inputClass} mb-3`}
                        value={pizza.name}
                        onChange={(e) => setPizza({ ...pizza, name: e.target.value })}
                    />

                    <select
                        className={`${inputClass} mb-3`}
                        value={pizza.type}
                        onChange={(e) =>
                            setPizza({
                                ...pizza,
                                type: e.target.value as Pizza["type"],
                            })
                        }
                    >
                        <option>Vegetarian</option>
                        <option>Non-Vegetarian</option>
                    </select>

                    <input
                        type="number"
                        className={`${inputClass} mb-3`}
                        value={pizza.price}
                        onChange={(e) =>
                            setPizza({ ...pizza, price: +e.target.value })
                        }
                    />

                    <input
                        className={`${inputClass} mb-3`}
                        value={pizza.imageUrl || ""}
                        onChange={(e) =>
                            setPizza({ ...pizza, imageUrl: e.target.value })
                        }
                    />

                    <textarea
                        className={`${inputClass} mb-3`}
                        rows={3}
                        value={pizza.description || ""}
                        onChange={(e) =>
                            setPizza({ ...pizza, description: e.target.value })
                        }
                    />

                    <div className="d-flex gap-2 mt-3">
                        <button
                            className="btn btn-outline-secondary btn-sm flex-grow-1"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-outline-primary btn-sm flex-grow-1"
                            disabled={saving}
                            onClick={() => window.confirm("Update this pizza?") && update()}
                        >
                            {saved ? "Updated" : saving ? "Updating..." : "Update Pizza"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePizza;