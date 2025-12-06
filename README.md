# Personal Finance Tracker

A full-stack web application for managing personal finances, built with Django REST Framework and React.

## Features

- 💰 **Transaction Management**: Track income and expenses with categories
- 🎯 **Budget Planning**: Set and monitor budgets for different categories
- 📊 **Dashboard**: Visual overview of financial summary and recent activities
- 📈 **Reports & Analytics**: Analyze spending patterns by category and time
- 👤 **User Authentication**: Secure JWT-based authentication
- 🎨 **Category Management**: Create custom categories with icons and colors
- 💱 **Multi-Currency Support**: Choose your preferred currency

## Tech Stack

### Backend
- Django 5.0
- Django REST Framework
- JWT Authentication (djangorestframework-simplejwt)
- SQLite Database
- CORS Headers

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Context API for state management
- CSS3 for styling

## Project Structure

```
Personal-Finance-Tracker/
├── backend/
│   ├── finance_tracker/          # Django project settings
│   ├── accounts/                 # User authentication app
│   ├── transactions/             # Transactions and categories app
│   ├── budgets/                  # Budget management app
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── context/             # Auth context
│   │   ├── pages/               # Page components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and get JWT tokens
- `POST /api/auth/token/refresh/` - Refresh access token
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile

### Categories
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create a new category
- `GET /api/categories/{id}/` - Get category details
- `PUT /api/categories/{id}/` - Update category
- `DELETE /api/categories/{id}/` - Delete category

### Transactions
- `GET /api/transactions/` - List all transactions (with filters)
- `POST /api/transactions/` - Create a new transaction
- `GET /api/transactions/{id}/` - Get transaction details
- `PUT /api/transactions/{id}/` - Update transaction
- `DELETE /api/transactions/{id}/` - Delete transaction
- `GET /api/transactions/summary/` - Get income/expense summary
- `GET /api/transactions/by_category/` - Get transactions grouped by category
- `GET /api/transactions/monthly_trend/` - Get monthly trend data

### Budgets
- `GET /api/budgets/` - List all budgets
- `POST /api/budgets/` - Create a new budget
- `GET /api/budgets/{id}/` - Get budget details
- `PUT /api/budgets/{id}/` - Update budget
- `DELETE /api/budgets/{id}/` - Delete budget

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Categories**: Go to Profile and create income/expense categories
3. **Add Transactions**: Record your income and expenses
4. **Set Budgets**: Create budgets for your expense categories
5. **View Dashboard**: Monitor your financial overview
6. **Analyze Reports**: View spending patterns and trends

## Features in Detail

### Dashboard
- Total income, expenses, and balance cards
- Recent transactions list
- Budget overview with progress bars

### Transactions
- Add, view, edit, and delete transactions
- Filter by type, category, and date range
- Categorize with custom icons and colors

### Budgets
- Set monthly or yearly budgets
- Visual progress tracking
- Overspending alerts (red indicators)

### Reports
- Income and expense breakdown by category
- Monthly trend analysis
- Percentage distribution charts

### Profile
- User information display
- Category management
- Custom category creation with icons and colors

## Development

### Running Tests
Backend:
```bash
cd backend
python manage.py test
```

Frontend:
```bash
cd frontend
npm test
```

### Building for Production
Frontend:
```bash
cd frontend
npm run build
```

## Security Notes

⚠️ **Important**: Before deploying to production:
- Change the Django `SECRET_KEY` in settings.py
- Set `DEBUG = False`
- Configure proper `ALLOWED_HOSTS`
- Use a production database (PostgreSQL recommended)
- Set up HTTPS
- Configure proper CORS settings
- Use environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

