import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Dashboard = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, transactionsRes, budgetsRes] = await Promise.all([
        axios.get(`${API_URL}/api/transactions/summary/`),
        axios.get(`${API_URL}/api/transactions/?page_size=5`),
        axios.get(`${API_URL}/api/budgets/`),
      ]);

      setSummary(summaryRes.data);
      setRecentTransactions(transactionsRes.data.results || transactionsRes.data);
      setBudgets(budgetsRes.data.results || budgetsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="summary-cards">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p className="amount">${Number(summary.income).toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p className="amount">${Number(summary.expense).toFixed(2)}</p>
        </div>
        <div className="card balance-card">
          <h3>Balance</h3>
          <p className="amount">${Number(summary.balance).toFixed(2)}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Recent Transactions</h2>
          {recentTransactions.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            <div className="transaction-list">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div>
                    <span className="category-icon">{transaction.category_icon}</span>
                    <span>{transaction.category_name || 'Uncategorized'}</span>
                  </div>
                  <div>
                    <span className={`amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      ${Number(transaction.amount).toFixed(2)}
                    </span>
                    <span className="date">{transaction.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2>Budget Overview</h2>
          {budgets.length === 0 ? (
            <p>No budgets set</p>
          ) : (
            <div className="budget-list">
              {budgets.map((budget) => (
                <div key={budget.id} className="budget-item">
                  <div className="budget-header">
                    <span>{budget.category_name}</span>
                    <span>
                      ${Number(budget.spent).toFixed(2)} / ${Number(budget.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="budget-bar">
                    <div
                      className="budget-progress"
                      style={{
                        width: `${Math.min(budget.percentage, 100)}%`,
                        backgroundColor: budget.percentage > 100 ? '#ef4444' : budget.category_color,
                      }}
                    ></div>
                  </div>
                  <span className="budget-percentage">{budget.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
