import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Pizza } from "./GetPizza";
import { useNavigate } from 'react-router-dom';

const FetchPizza: React.FC = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Pizza';
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/pizzas')
            .then(response => {
                setPizzas(response.data.Data);
            })
            .catch(error => {
                setError('Failed to fetch pizza');
            });
    }, []);

    const handleUpdateClick = (pizzaId: number) => {
        navigate(`/update-pizza/${pizzaId.toString()}`);
    };

    if (error) return <p className="text-center">{error}</p>;

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-center">Pizza List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pizzas.map(pizza => (
                        <tr key={pizza.pizza_id}>
                            <td>{pizza.pizza_id}</td>
                            <td>{pizza.name}</td>
                            <td>{pizza.type}</td>
                            <td>
                                Regular ${pizza.regularPrice}<br />
                                Medium ${pizza.mediumPrice}<br />
                                Large ${pizza.largePrice}
                            </td>
                            <td>
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => handleUpdateClick(pizza.pizza_id)}
                                >
                                    Update
                                </button>
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FetchPizza;