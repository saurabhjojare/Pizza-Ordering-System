import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Pizza.css'; 

const UpdatePizza: React.FC = () => {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState<'Vegetarian' | 'Non-Vegetarian'>('Vegetarian');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [mediumPrice, setMediumPrice] = useState('');
  const [largePrice, setLargePrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Update Pizza';
  }, []);


  useEffect(() => {
    if (!pizzaId) return;

    const fetchPizza = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/pizzas/${pizzaId}`);
        const pizza = response.data.Data; 
        setName(pizza.name || '');
        setType(pizza.type || 'Vegetarian');
        setImageUrl(pizza.imageUrl || '');
        setDescription(pizza.description || '');
        setRegularPrice(pizza.regularPrice || '');
        setMediumPrice(pizza.mediumPrice || '');
        setLargePrice(pizza.largePrice || '');
      } catch (err) {
        setError('Failed to load pizza data');
      }
    };

    fetchPizza();
  }, [pizzaId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const updatedPizza = {
      name,
      type,
      imageUrl,
      description,
      regularPrice,
      mediumPrice,
      largePrice,
    };
  
    try {
      const response = await axios.patch(`http://localhost:5000/api/v1/pizzas/${pizzaId}`, updatedPizza);
  
      if (response.data.Success) {
        setSuccess('Pizza updated successfully!');
        setError(null);
        navigate('/pizza');
      } else {
        throw new Error(response.data.Message || 'Failed to update pizza');
      }
    } catch (err) {
      setError('Failed to update pizza');
      setSuccess(null);
    }
  };

  return (
    <div className="container container-with-navbar">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h3 className="mb-2 text-center">Update Pizza</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="form-group mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value as 'Vegetarian' | 'Non-Vegetarian')}
                required
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                className="form-control"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="regularPrice">Regular Price</label>
              <input
                type="text"
                id="regularPrice"
                className="form-control"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="mediumPrice">Medium Price</label>
              <input
                type="text"
                id="mediumPrice"
                className="form-control"
                value={mediumPrice}
                onChange={(e) => setMediumPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="largePrice">Large Price</label>
              <input
                type="text"
                id="largePrice"
                className="form-control"
                value={largePrice}
                onChange={(e) => setLargePrice(e.target.value)}
                required
              />
            </div>
            <div className='text-center'>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePizza;
