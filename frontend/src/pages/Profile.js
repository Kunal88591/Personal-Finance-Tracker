import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Profile = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    color: '#6366f1',
    icon: '💰',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories/`);
      setCategories(response.data.results || response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/categories/`, formData);
      setShowModal(false);
      setFormData({
        name: '',
        type: 'expense',
        color: '#6366f1',
        icon: '💰',
      });
      fetchCategories();
    } catch (error) {
      console.error('Failed to create category', error);
      alert('Failed to create category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will affect all related transactions.')) {
      try {
        await axios.delete(`${API_URL}/api/categories/${id}/`);
        fetchCategories();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  const commonIcons = ['💰', '🏠', '🍔', '🚗', '🎮', '📱', '👕', '💊', '🎓', '✈️', '🎬', '🏋️'];

  return (
    <div className="profile">
      <h1>Profile</h1>

      <div className="card">
        <h2>User Information</h2>
        <div className="profile-info">
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">{user?.username}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="label">Currency:</span>
            <span className="value">{user?.currency}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Manage Categories</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Add Category
          </button>
        </div>

        <div className="categories-section">
          <h3>Income Categories</h3>
          <div className="categories-list">
            {incomeCategories.map(cat => (
              <div key={cat.id} className="category-chip" style={{ borderColor: cat.color }}>
                <span className="category-icon">{cat.icon}</span>
                <span>{cat.name}</span>
                <button className="delete-btn" onClick={() => handleDelete(cat.id)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="categories-section">
          <h3>Expense Categories</h3>
          <div className="categories-list">
            {expenseCategories.map(cat => (
              <div key={cat.id} className="category-chip" style={{ borderColor: cat.color }}>
                <span className="category-icon">{cat.icon}</span>
                <span>{cat.name}</span>
                <button className="delete-btn" onClick={() => handleDelete(cat.id)}>×</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="form-group">
                <label>Icon</label>
                <div className="icon-picker">
                  {commonIcons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
