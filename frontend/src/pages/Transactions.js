import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [filter, setFilter] = useState({ type: '', category: '' });

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [filter]);

  const fetchTransactions = async () => {
    try {
      let url = `${API_URL}/api/transactions/`;
      const params = new URLSearchParams();
      if (filter.type) params.append('type', filter.type);
      if (filter.category) params.append('category', filter.category);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await axios.get(url);
      setTransactions(response.data.results || response.data);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    }
  };

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
      await axios.post(`${API_URL}/api/transactions/`, formData);
      setShowModal(false);
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      fetchTransactions();
    } catch (error) {
      console.error('Failed to create transaction', error);
      alert('Failed to create transaction');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`${API_URL}/api/transactions/${id}/`);
        fetchTransactions();
      } catch (error) {
        console.error('Failed to delete transaction', error);
      }
    }
  };

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <div className="transactions">
      <div className="page-header">
        <h1>Transactions</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Add Transaction
        </button>
      </div>

      <div className="filters">
        <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>
                  <span className="category-icon">{transaction.category_icon}</span>
                  {transaction.category_name || 'Uncategorized'}
                </td>
                <td>{transaction.description}</td>
                <td>
                  <span className={`badge ${transaction.type}`}>{transaction.type}</span>
                </td>
                <td className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
                </td>
                <td>
                  <button className="btn-danger" onClick={() => handleDelete(transaction.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value, category: '' })}
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
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
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {filteredCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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

export default Transactions;
