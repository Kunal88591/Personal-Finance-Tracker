import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Reports = () => {
  const [byCategory, setByCategory] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [dateRange, setDateRange] = useState({
    start_date: '',
    end_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const startDate = date.toISOString().split('T')[0];
    setDateRange({ ...dateRange, start_date: startDate });
    fetchReports(startDate, dateRange.end_date);
  }, []);

  const fetchReports = async (start, end) => {
    try {
      const [categoryRes, trendRes] = await Promise.all([
        axios.get(`${API_URL}/api/transactions/by_category/?start_date=${start}&end_date=${end}`),
        axios.get(`${API_URL}/api/transactions/monthly_trend/`),
      ]);

      setByCategory(categoryRes.data);
      setMonthlyTrend(trendRes.data);
    } catch (error) {
      console.error('Failed to fetch reports', error);
    }
  };

  const handleDateChange = (e) => {
    const newRange = { ...dateRange, [e.target.name]: e.target.value };
    setDateRange(newRange);
    if (newRange.start_date && newRange.end_date) {
      fetchReports(newRange.start_date, newRange.end_date);
    }
  };

  const incomeByCategory = byCategory.filter(item => item.type === 'income');
  const expenseByCategory = byCategory.filter(item => item.type === 'expense');

  const totalIncome = incomeByCategory.reduce((sum, item) => sum + Number(item.total), 0);
  const totalExpense = expenseByCategory.reduce((sum, item) => sum + Number(item.total), 0);

  return (
    <div className="reports">
      <h1>Reports & Analytics</h1>

      <div className="date-range-selector">
        <div className="form-group">
          <label>From</label>
          <input
            type="date"
            name="start_date"
            value={dateRange.start_date}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label>To</label>
          <input
            type="date"
            name="end_date"
            value={dateRange.end_date}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="reports-grid">
        <div className="card">
          <h2>Income by Category</h2>
          {incomeByCategory.length === 0 ? (
            <p>No income data</p>
          ) : (
            <div className="category-breakdown">
              {incomeByCategory.map((item, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-icon">{item.category__icon}</span>
                    <span className="category-name">{item.category__name || 'Uncategorized'}</span>
                  </div>
                  <div className="category-amount">
                    <span className="amount">${Number(item.total).toFixed(2)}</span>
                    <span className="percentage">
                      {totalIncome > 0 ? ((item.total / totalIncome) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="category-bar">
                    <div
                      className="category-progress"
                      style={{
                        width: `${totalIncome > 0 ? (item.total / totalIncome) * 100 : 0}%`,
                        backgroundColor: item.category__color || '#10b981',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2>Expenses by Category</h2>
          {expenseByCategory.length === 0 ? (
            <p>No expense data</p>
          ) : (
            <div className="category-breakdown">
              {expenseByCategory.map((item, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-icon">{item.category__icon}</span>
                    <span className="category-name">{item.category__name || 'Uncategorized'}</span>
                  </div>
                  <div className="category-amount">
                    <span className="amount">${Number(item.total).toFixed(2)}</span>
                    <span className="percentage">
                      {totalExpense > 0 ? ((item.total / totalExpense) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="category-bar">
                    <div
                      className="category-progress"
                      style={{
                        width: `${totalExpense > 0 ? (item.total / totalExpense) * 100 : 0}%`,
                        backgroundColor: item.category__color || '#ef4444',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>Monthly Trend</h2>
        {monthlyTrend.length === 0 ? (
          <p>No trend data available</p>
        ) : (
          <div className="trend-chart">
            {Array.from(new Set(monthlyTrend.map(item => item.month))).map(month => {
              const income = monthlyTrend.find(
                item => item.month === month && item.type === 'income'
              )?.total || 0;
              const expense = monthlyTrend.find(
                item => item.month === month && item.type === 'expense'
              )?.total || 0;
              
              return (
                <div key={month} className="trend-item">
                  <div className="trend-month">{new Date(month).toLocaleDateString('en', { month: 'short', year: 'numeric' })}</div>
                  <div className="trend-bars">
                    <div className="trend-bar income-bar" style={{ width: `${(income / 5000) * 100}%` }}>
                      <span>${Number(income).toFixed(0)}</span>
                    </div>
                    <div className="trend-bar expense-bar" style={{ width: `${(expense / 5000) * 100}%` }}>
                      <span>${Number(expense).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
