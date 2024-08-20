import React, { useState } from 'react';
import axios from 'axios';
import './AddPizza.css'; // Import your CSS file

const AddPizza: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'Vegetarian' | 'Non-Vegetarian'>('Vegetarian');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [mediumPrice, setMediumPrice] = useState('');
  const [largePrice, setLargePrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newPizza = {
        name,
        type,
        imageUrl,
        description,
        regularPrice,
        mediumPrice,
        largePrice,
      };

      await axios.post('http://localhost:5000/api/v1/pizzas', newPizza);
      setSuccess('Pizza added successfully!');
      setError(null);
      // Reset form fields
      setName('');
      setType('Vegetarian');
      setImageUrl('');
      setDescription('');
      setRegularPrice('');
      setMediumPrice('');
      setLargePrice('');
    } catch (err) {
      setError('Failed to add pizza');
      setSuccess(null);
    }
  };

  return (
    <div className="container container-with-navbar">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <h3 className="mb-2 text-center">Add New Pizza</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-2">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="type" className="form-label">Type</label>
              <select
                id="type"
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value as 'Vegetarian' | 'Non-Vegetarian')}
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="imageUrl" className="form-label">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                className="form-control"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="regularPrice" className="form-label">Regular Price</label>
              <input
                type="number"
                id="regularPrice"
                className="form-control"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="mediumPrice" className="form-label">Medium Price</label>
              <input
                type="number"
                id="mediumPrice"
                className="form-control"
                value={mediumPrice}
                onChange={(e) => setMediumPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="largePrice" className="form-label">Large Price</label>
              <input
                type="number"
                id="largePrice"
                className="form-control"
                value={largePrice}
                onChange={(e) => setLargePrice(e.target.value)}
                required
              />
            </div>
            <div className='d-flex justify-content-center'>
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPizza;
