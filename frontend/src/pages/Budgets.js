import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
  });

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/budgets/`);
      setBudgets(response.data.results || response.data);
    } catch (error) {
      console.error('Failed to fetch budgets', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories/`);
      const expenseCategories = (response.data.results || response.data).filter(
        cat => cat.type === 'expense'
      );
      setCategories(expenseCategories);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const calculateEndDate = (startDate, period) => {
    const start = new Date(startDate);
    if (period === 'monthly') {
      start.setMonth(start.getMonth() + 1);
    } else {
      start.setFullYear(start.getFullYear() + 1);
    }
    return start.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endDate = formData.end_date || calculateEndDate(formData.start_date, formData.period);
      await axios.post(`${API_URL}/api/budgets/`, { ...formData, end_date: endDate });
      setShowModal(false);
      setFormData({
        category: '',
        amount: '',
        period: 'monthly',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
      });
      fetchBudgets();
    } catch (error) {
      console.error('Failed to create budget', error);
      alert('Failed to create budget');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await axios.delete(`${API_URL}/api/budgets/${id}/`);
        fetchBudgets();
      } catch (error) {
        console.error('Failed to delete budget', error);
      }
    }
  };

  return (
    <div className="budgets">
      <div className="page-header">
        <h1>Budgets</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Set Budget
        </button>
      </div>

      <div className="budgets-grid">
        {budgets.map(budget => (
          <div key={budget.id} className="budget-card">
            <div className="budget-card-header">
              <h3>{budget.category_name}</h3>
              <button className="btn-danger-small" onClick={() => handleDelete(budget.id)}>
                ×
              </button>
            </div>
            <div className="budget-amounts">
              <span className="spent">${Number(budget.spent).toFixed(2)}</span>
              <span className="divider">/</span>
              <span className="total">${Number(budget.amount).toFixed(2)}</span>
            </div>
            <div className="budget-bar-large">
              <div
                className="budget-progress-large"
                style={{
                  width: `${Math.min(budget.percentage, 100)}%`,
                  backgroundColor: budget.percentage > 100 ? '#ef4444' : 
                                  budget.percentage > 80 ? '#f59e0b' : '#10b981',
                }}
              ></div>
            </div>
            <div className="budget-details">
              <span className={`percentage ${budget.percentage > 100 ? 'over-budget' : ''}`}>
                {budget.percentage}% used
              </span>
              <span className="period">{budget.period}</span>
            </div>
            <div className="budget-dates">
              {budget.start_date} to {budget.end_date}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Set Budget</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  required
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  required
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

export default Budgets;
