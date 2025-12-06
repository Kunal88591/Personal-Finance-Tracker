import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>💰 Finance Tracker</h2>
        </div>
        <ul className="nav-menu">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" className={({ isActive }) => isActive ? 'active' : ''}>
              💳 Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/budgets" className={({ isActive }) => isActive ? 'active' : ''}>
              🎯 Budgets
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
              📈 Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
              👤 Profile
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            <p>{user?.username}</p>
            <button onClick={logout} className="btn-logout">Logout</button>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
