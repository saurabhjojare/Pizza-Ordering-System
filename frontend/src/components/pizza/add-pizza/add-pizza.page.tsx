import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";
import { useAddPizza } from "./add-pizza.use";

const AddPizza = () => {
    const navigate = useNavigate();
    const { pizza, setPizza, error, saving, saved, create } = useAddPizza();

    return (
        <div className="container py-4">
            <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: 500 }}>
                <div className="card-body p-3">
                    <h6 className="fw-semibold mb-3">Add Pizza</h6>

                    <input
                        className="form-control form-control-sm mb-2"
                        placeholder="Pizza name"
                        value={pizza.name}
                        onChange={e => setPizza({ ...pizza, name: e.target.value })}
                    />

                    <select
                        className="form-select form-select-sm mb-2"
                        value={pizza.type}
                        onChange={e => setPizza({ ...pizza, type: e.target.value })}
                    >
                        <option>Vegetarian</option>
                        <option>Non-Vegetarian</option>
                    </select>

                    <input
                        type="number"
                        className="form-control form-control-sm mb-2"
                        placeholder="Price"
                        value={pizza.price}
                        onChange={e => setPizza({ ...pizza, price: +e.target.value })}
                    />

                    <input
                        className="form-control form-control-sm mb-2"
                        placeholder="Image URL"
                        value={pizza.imageUrl}
                        onChange={e => setPizza({ ...pizza, imageUrl: e.target.value })}
                    />

                    <textarea
                        className="form-control form-control-sm mb-2"
                        rows={3}
                        placeholder="Description"
                        value={pizza.description}
                        onChange={e => setPizza({ ...pizza, description: e.target.value })}
                    />

                    {error && <small className="text-danger d-block mb-2">{error}</small>}

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-outline-secondary btn-sm w-50"
                            onClick={() => navigate(Routes.ROOT)}
                        >
                            Cancel
                        </button>

                        <button
                            className={`btn btn-sm w-50 ${saved ? "btn-success" : "btn-primary"}`}
                            disabled={saving}
                            onClick={() => window.confirm("Add this pizza?") && create()}
                        >
                            {saved ? "Added" : saving ? "Adding..." : "Add Pizza"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPizza;