import React, { useState } from 'react';
import axios from 'axios';

const AddPizza: React.FC<{ show: boolean; onClose: () => void; }> = ({ show, onClose }) => {
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
      onClose(); // Close modal after success
      // Reset form fields after successful submission
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
    <div className={`modal ${show ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: show ? 'block' : 'none', marginTop: '50px', paddingBottom: '100px'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">Add New Pizza</h5>
            <button type="button" className="btn btn-danger close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">Close</span>
            </button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="name" className="col-sm-3 col-form-label text-black">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="type" className="col-sm-3 col-form-label text-black">Type</label>
                <div className="col-sm-9">
                  <select
                    id="type"
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value as 'Vegetarian' | 'Non-Vegetarian')}
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="imageUrl" className="col-sm-3 col-form-label text-black">Image URL</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    id="imageUrl"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="description" className="col-sm-3 col-form-label text-black">Description</label>
                <div className="col-sm-9">
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="regularPrice" className="col-sm-3 col-form-label text-black">Regular Price</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    id="regularPrice"
                    className="form-control"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="mediumPrice" className="col-sm-3 col-form-label text-black">Medium Price</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    id="mediumPrice"
                    className="form-control"
                    value={mediumPrice}
                    onChange={(e) => setMediumPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="largePrice" className="col-sm-3 col-form-label text-black">Large Price</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    id="largePrice"
                    className="form-control"
                    value={largePrice}
                    onChange={(e) => setLargePrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPizza;