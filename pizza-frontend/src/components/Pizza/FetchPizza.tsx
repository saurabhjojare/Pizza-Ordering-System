import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Pizza } from "./GetPizza";

const FetchPizza: React.FC = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/pizzas')
            .then(response => {
                setPizzas(response.data.Data);
            })
            .catch(error => {
                setError('Failed to fetch pizza');
            });
    }, [])

    if (error) return <p className="text-center">{error}</p>

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Pizza List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Regular Price</th>
                        <th>Medium Price</th>
                        <th>Large Price</th>
                    </tr>
                </thead>
                <tbody>
                    {pizzas.map(pizza => (
                        <tr key={pizza.pizza_id}>
                            <td>{pizza.name}</td>
                            <td>{pizza.type}</td>
                            <td>{pizza.regularPrice}</td>
                            <td>{pizza.mediumPrice}</td>
                            <td>{pizza.largePrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FetchPizza;

