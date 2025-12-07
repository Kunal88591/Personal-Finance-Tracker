<p align="center">
  <img src="https://img.icons8.com/3d-fluency/94/money-bag.png" alt="Logo" width="80" height="80">
  <h1 align="center">💰 Personal Finance Tracker</h1>
  <p align="center">
    <strong>Take control of your finances with style</strong>
  </p>
  <p align="center">
    A modern, full-stack web application for tracking expenses, managing budgets, and visualizing your financial health.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/REST_API-DRF-red?style=for-the-badge&logo=django&logoColor=white" alt="DRF">
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
</p>

---

## ✨ Features

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/3d-fluency/50/money-transfer.png" alt="Transactions"><br>
      <strong>💳 Transactions</strong><br>
      <sub>Track all your income & expenses with ease</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/3d-fluency/50/goal.png" alt="Budgets"><br>
      <strong>🎯 Smart Budgets</strong><br>
      <sub>Set limits & get alerts when overspending</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/3d-fluency/50/combo-chart.png" alt="Reports"><br>
      <strong>📊 Visual Reports</strong><br>
      <sub>Beautiful charts & spending insights</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/3d-fluency/50/dashboard.png" alt="Dashboard"><br>
      <strong>📈 Dashboard</strong><br>
      <sub>Real-time financial overview at a glance</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/3d-fluency/50/category.png" alt="Categories"><br>
      <strong>🏷️ Custom Categories</strong><br>
      <sub>Organize with icons & colors</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/3d-fluency/50/lock.png" alt="Security"><br>
      <strong>🔐 Secure Auth</strong><br>
      <sub>JWT-based authentication</sub>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<table>
  <tr>
    <th align="center">🔧 Backend</th>
    <th align="center">🎨 Frontend</th>
  </tr>
  <tr>
    <td>
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"> Python 3.10+<br>
      <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white"> Django 5.0<br>
      <img src="https://img.shields.io/badge/DRF-red?style=flat-square&logo=django&logoColor=white"> REST Framework<br>
      <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"> SimpleJWT<br>
      <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white"> SQLite
    </td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"> React 18<br>
      <img src="https://img.shields.io/badge/Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"> React Router v6<br>
      <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"> Axios<br>
      <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"> Modern CSS<br>
      <img src="https://img.shields.io/badge/Context-61DAFB?style=flat-square&logo=react&logoColor=black"> Context API
    </td>
  </tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

```
✅ Python 3.10+
✅ Node.js 18+
✅ npm or yarn
```

### ⚡ One-Command Setup

```bash
# Clone the repository
git clone https://github.com/kunal885911/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker
```

### 🔧 Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### 🎨 Frontend

```bash
cd frontend
npm install
npm start
```

> 💡 **Tip:** Create `frontend/.env` with `REACT_APP_API_URL=http://localhost:8000`

---

## 📡 API Reference

<details>
<summary><strong>🔐 Authentication</strong></summary>

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `POST` | `/api/auth/register/` | Create new account |
| `POST` | `/api/auth/login/` | Login & get JWT tokens |
| `GET` | `/api/auth/profile/` | Get user profile |

</details>

<details>
<summary><strong>💳 Transactions</strong></summary>

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/transactions/` | List all transactions |
| `POST` | `/api/transactions/` | Create transaction |
| `GET` | `/api/transactions/{id}/` | Get transaction details |
| `PUT` | `/api/transactions/{id}/` | Update transaction |
| `DELETE` | `/api/transactions/{id}/` | Delete transaction |
| `GET` | `/api/transactions/summary/` | Get income/expense totals |
| `GET` | `/api/transactions/by_category/` | Breakdown by category |
| `GET` | `/api/transactions/monthly_trend/` | Monthly trends |

</details>

<details>
<summary><strong>🎯 Budgets & Categories</strong></summary>

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/budgets/` | List all budgets |
| `POST` | `/api/budgets/` | Create budget |
| `DELETE` | `/api/budgets/{id}/` | Delete budget |
| `GET` | `/api/categories/` | List categories |
| `POST` | `/api/categories/` | Create category |

</details>

---

## 📁 Project Structure

```
📦 Personal-Finance-Tracker
├── 🔧 backend/
│   ├── 👤 accounts/           # Authentication & user management
│   ├── 💳 transactions/       # Transactions & categories
│   ├── 🎯 budgets/            # Budget tracking
│   ├── ⚙️ finance_tracker/    # Django settings
│   ├── 📋 requirements.txt
│   └── 🗄️ db.sqlite3
│
├── 🎨 frontend/
│   └── 📂 src/
│       ├── 🔐 context/        # Auth state management
│       ├── 📄 pages/          # React page components
│       ├── 🎨 App.css         # Global styles
│       └── 🚀 App.js          # Main app component
│
└── 📖 README.md
```

---

## 🎯 Default Categories

The app comes with pre-configured categories:

| 💰 Income | 💸 Expenses |
|-----------|-------------|
| 💼 Salary | 🍔 Food & Dining |
| 💻 Freelance | 🚗 Transportation |
| 📈 Investments | 🛒 Shopping |
| 🎁 Other Income | 🎬 Entertainment |
| | 💡 Utilities |
| | 🏥 Healthcare |
| | 📚 Education |
| | 📦 Other |

---

## 👨‍💻 Author

<p align="center">
  <img src="https://img.shields.io/badge/Author-Kunal%20Meena-blue?style=for-the-badge" alt="Author">
</p>

<p align="center">
  <a href="https://github.com/Kunal88591">
    <img src="https://img.shields.io/badge/GitHub-Kunal88591-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="mailto:kunalmeena1311@gmail.com">
    <img src="https://img.shields.io/badge/Email-kunalmeena1311@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>

<p align="center">
  <strong>Kunal Meena</strong><br>
  <sub>Full Stack Developer</sub>
</p>

---

## 📄 License

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License">
</p>

```
MIT License

Copyright (c) 2025 Kunal Meena

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  ⭐ <strong>Star this repo if you found it helpful!</strong> ⭐
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/Kunal88591">Kunal Meena</a>
</p>
