# 💰 Expense Tracker API

> **Track your expenses like a pro!** A powerful, secure, and feature-rich REST API built with Node.js, Express, and MongoDB that helps you manage your financial life with ease.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-blue.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18+-orange.svg)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-red.svg)](https://jwt.io/)

---

## 🌟 What Makes This API Special?

This isn't just another CRUD API! Our Expense Tracker API is designed with real-world usage in mind:

- 🔐 **Bank-level Security**: JWT authentication keeps your data safe
- 🚀 **Lightning Fast**: Optimized queries with pagination and filtering
- 📊 **Smart Analytics**: Filter by date ranges, categories, and more
- 🛡️ **DDoS Protection**: Built-in rate limiting
- 🎯 **Developer Friendly**: Clean, RESTful endpoints with comprehensive docs

---

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │───▶│  Express API    │───▶│    MongoDB      │
│  (Frontend/     │    │                 │    │                 │
│   Mobile App)   │    │ • JWT Auth      │    │ • Users         │
└─────────────────┘    │ • Rate Limiting │    │ • Tasks/Expenses│
                       │ • Validation    │    │                 │
                       └─────────────────┘    └─────────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites

Before diving in, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- **npm** or **yarn** package manager
- **Postman** or similar API testing tool (recommended)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/expense-tracker-api.git
   cd expense-tracker-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

5. **Verify installation**
   
   Open your browser and visit `http://localhost:3000/health` - you should see:
   ```json
   {
     "status": "OK",
     "message": "Expense Tracker API is running!",
     "timestamp": "2025-08-30T10:30:00.000Z"
   }
   ```

---

## 🎯 API Endpoints Overview

### 👤 User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/register` | Create new user account | ❌ |
| `POST` | `/api/users/login` | Authenticate user | ❌ |
| `GET` | `/api/users` | Get all users (admin only) | ✅ |
| `GET` | `/api/users/:id` | Get specific user | ✅ |
| `PUT` | `/api/users/:id` | Update user details | ✅ |
| `PUT` | `/api/users/:id/password` | Change password | ✅ |
| `DELETE` | `/api/users/:id` | Delete user account | ✅ |

### 💳 Task/Expense Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/tasks` | Create new expense | ✅ |
| `GET` | `/api/tasks` | Get all expenses (with filters) | ✅ |
| `GET` | `/api/tasks/:id` | Get specific expense | ✅ |
| `PUT` | `/api/tasks/:id` | Update expense | ✅ |
| `DELETE` | `/api/tasks/:id` | Delete expense | ✅ |

---

## 🧪 Step-by-Step Testing Guide

Let's walk through testing the API to make sure everything works perfectly!

### Phase 1: User Registration & Authentication

#### 1. Create a New User 👤

**Endpoint:** `POST /api/users/register`

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "64f7b1c2e8a5d2f1a3b4c5d6",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2025-08-30T10:30:00.000Z"
  }
}
```

#### 2. Login to Get JWT Token 🔑

**Endpoint:** `POST /api/users/login`

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f7b1c2e8a5d2f1a3b4c5d6",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

**💡 Important:** Save the token! You'll need it for all subsequent requests.

### Phase 2: Task/Expense Management

For all following requests, include the JWT token in the Authorization header:
```
Authorization: Bearer your-jwt-token-here
```

#### 3. Create Your First Expense 💸

**Endpoint:** `POST /api/tasks`

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token-here" \
  -d '{
    "title": "Grocery Shopping",
    "description": "Weekly groceries from Walmart",
    "amount": 85.50,
    "category": "Food",
    "date": "2025-08-30"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "64f7b1c2e8a5d2f1a3b4c5d7",
    "title": "Grocery Shopping",
    "description": "Weekly groceries from Walmart",
    "amount": 85.50,
    "category": "Food",
    "date": "2025-08-30T00:00:00.000Z",
    "userId": "64f7b1c2e8a5d2f1a3b4c5d6",
    "createdAt": "2025-08-30T10:35:00.000Z"
  }
}
```

#### 4. Create More Sample Expenses 📝

Let's add a few more expenses to test filtering:

```bash
# Transportation expense
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token-here" \
  -d '{
    "title": "Uber Ride",
    "description": "Airport to hotel",
    "amount": 25.00,
    "category": "Transportation",
    "date": "2025-08-29"
  }'

# Entertainment expense
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token-here" \
  -d '{
    "title": "Movie Night",
    "description": "Cinema tickets and popcorn",
    "amount": 45.75,
    "category": "Entertainment",
    "date": "2025-08-28"
  }'
```

### Phase 3: Advanced Querying & Filtering

#### 5. Get All Expenses (Basic) 📋

**Endpoint:** `GET /api/tasks`

```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer your-jwt-token-here"
```

#### 6. Test Pagination 📄

```bash
# Get first 2 expenses
curl -X GET "http://localhost:3000/api/tasks?page=1&limit=2" \
  -H "Authorization: Bearer your-jwt-token-here"
```

#### 7. Test Sorting 🔄

```bash
# Sort by amount (highest first)
curl -X GET "http://localhost:3000/api/tasks?sortBy=amount&order=desc" \
  -H "Authorization: Bearer your-jwt-token-here"

# Sort by date (newest first)
curl -X GET "http://localhost:3000/api/tasks?sortBy=date&order=desc" \
  -H "Authorization: Bearer your-jwt-token-here"
```

#### 8. Test Category Filtering 🏷️

```bash
# Get only Food expenses
curl -X GET "http://localhost:3000/api/tasks?category=Food" \
  -H "Authorization: Bearer your-jwt-token-here"
```

#### 9. Test Date Range Filtering 📅

```bash
# Get expenses from last 7 days
curl -X GET "http://localhost:3000/api/tasks?date_range=last_7_days" \
  -H "Authorization: Bearer your-jwt-token-here"

# Get expenses for a specific date range
curl -X GET "http://localhost:3000/api/tasks?start_date=2025-08-28&end_date=2025-08-30" \
  -H "Authorization: Bearer your-jwt-token-here"
```

#### 10. Advanced Combined Query 🎯

```bash
# Get Food expenses from last week, sorted by amount, with pagination
curl -X GET "http://localhost:3000/api/tasks?category=Food&date_range=last_7_days&sortBy=amount&order=desc&page=1&limit=5" \
  -H "Authorization: Bearer your-jwt-token-here"
```

### Phase 4: Update & Delete Operations

#### 11. Update an Expense ✏️

**Endpoint:** `PUT /api/tasks/:id`

```bash
curl -X PUT http://localhost:3000/api/tasks/64f7b1c2e8a5d2f1a3b4c5d7 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token-here" \
  -d '{
    "title": "Grocery Shopping - Updated",
    "amount": 92.30,
    "description": "Weekly groceries from Walmart + extra snacks"
  }'
```

#### 12. Get Specific Expense 🔍

**Endpoint:** `GET /api/tasks/:id`

```bash
curl -X GET http://localhost:3000/api/tasks/64f7b1c2e8a5d2f1a3b4c5d7 \
  -H "Authorization: Bearer your-jwt-token-here"
```

#### 13. Delete an Expense 🗑️

**Endpoint:** `DELETE /api/tasks/:id`

```bash
curl -X DELETE http://localhost:3000/api/tasks/64f7b1c2e8a5d2f1a3b4c5d7 \
  -H "Authorization: Bearer your-jwt-token-here"
```

---

## 🔧 Advanced Features Deep Dive

### 🔍 Powerful Filtering System

Our API supports sophisticated filtering to help you find exactly what you're looking for:

#### Date Range Options
- `last_7_days` - Expenses from the past week
- `last_30_days` - Expenses from the past month
- `this_month` - Current month's expenses
- `last_month` - Previous month's expenses
- Custom range using `start_date` and `end_date`

#### Sorting Options
- **sortBy**: `date`, `amount`, `title`, `category`, `createdAt`
- **order**: `asc` (ascending) or `desc` (descending)

#### Pagination
- **page**: Page number (default: 1)
- **limit**: Items per page (default: 10, max: 100)

### 🛡️ Security Features

#### JWT Authentication Flow
1. User registers/logs in → Receives JWT token
2. Client stores token securely
3. Include token in `Authorization: Bearer <token>` header for protected routes
4. Server validates token on each request

#### Rate Limiting
- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Headers**: Response includes rate limit status

---

## 📚 Complete API Reference

### User Endpoints

#### Register New User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

#### Update User Profile
```http
PUT /api/users/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

#### Change Password
```http
PUT /api/users/:id/password
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "currentPassword": "SecurePass123!",
  "newPassword": "NewSecurePass456!"
}
```

### Task/Expense Endpoints

#### Create Expense
```http
POST /api/tasks
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Coffee Shop",
  "description": "Morning latte",
  "amount": 4.50,
  "category": "Food",
  "date": "2025-08-30"
}
```

#### Get Expenses with Filters
```http
GET /api/tasks?category=Food&sortBy=amount&order=desc&page=1&limit=10
Authorization: Bearer <jwt-token>
```

#### Update Expense
```http
PUT /api/tasks/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "amount": 5.25,
  "description": "Morning latte + tip"
}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Personal Budget Tracking
```bash
# 1. Register as a new user
# 2. Create expenses for different categories
# 3. Get monthly summary
curl -X GET "http://localhost:3000/api/tasks?date_range=this_month&sortBy=category" \
  -H "Authorization: Bearer <token>"
```

### Scenario 2: Expense Analysis
```bash
# Find your biggest expenses this month
curl -X GET "http://localhost:3000/api/tasks?date_range=this_month&sortBy=amount&order=desc&limit=5" \
  -H "Authorization: Bearer <token>"
```

### Scenario 3: Category Spending
```bash
# How much did I spend on food this week?
curl -X GET "http://localhost:3000/api/tasks?category=Food&date_range=last_7_days" \
  -H "Authorization: Bearer <token>"
```

---

## 🎨 Using with Frontend Applications

### JavaScript/React Example

```javascript
const API_BASE = 'http://localhost:3000/api';
let authToken = localStorage.getItem('token');

// Login function
async function login(email, password) {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.success) {
    authToken = data.data.token;
    localStorage.setItem('token', authToken);
  }
  return data;
}

// Create expense function
async function createExpense(expenseData) {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(expenseData)
  });
  
  return await response.json();
}

// Get filtered expenses
async function getExpenses(filters = {}) {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE}/tasks?${queryParams}`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  
  return await response.json();
}
```

---

## 🔒 Security Best Practices

### For API Usage:
- ✅ Always use HTTPS in production
- ✅ Store JWT tokens securely (not in localStorage for sensitive apps)
- ✅ Implement token refresh mechanism
- ✅ Validate all inputs on client-side before sending
- ✅ Handle rate limiting gracefully

### For API Development:
- ✅ Use environment variables for secrets
- ✅ Implement input validation and sanitization
- ✅ Add request logging for monitoring
- ✅ Set up proper CORS configuration
- ✅ Consider implementing refresh tokens

---

## 🚨 Common Issues & Troubleshooting

### Issue: "Authorization header is missing"
**Solution:** Make sure you're including the JWT token in your requests:
```bash
-H "Authorization: Bearer your-actual-jwt-token"
```

### Issue: "Too many requests"
**Solution:** You've hit the rate limit. Wait 15 minutes or reduce request frequency.

### Issue: "Invalid token"
**Solutions:**
- Check if token has expired (default: 7 days)
- Verify token format: `Bearer <token>`
- Re-login to get a fresh token

### Issue: "MongoDB connection failed"
**Solutions:**
- Check if MongoDB is running: `mongosh` (for local) or verify Atlas connection
- Verify `MONGODB_URI` in `.env` file
- Check network connectivity

---

## 🎯 Sample Data for Testing

Here's some sample data you can use to quickly populate your API for testing:

```json
{
  "users": [
    {
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "password": "Alice123!"
    },
    {
      "name": "Bob Wilson",
      "email": "bob@example.com",
      "password": "Bob123!"
    }
  ],
  "expenses": [
    {
      "title": "Starbucks Coffee",
      "description": "Morning coffee",
      "amount": 5.95,
      "category": "Food",
      "date": "2025-08-30"
    },
    {
      "title": "Gas Station",
      "description": "Fill up the tank",
      "amount": 45.00,
      "category": "Transportation",
      "date": "2025-08-29"
    },
    {
      "title": "Netflix Subscription",
      "description": "Monthly streaming",
      "amount": 15.99,
      "category": "Entertainment",
      "date": "2025-08-28"
    }
  ]
}
```

---

## 📊 Response Format Standards

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* actual data */ },
  "meta": { /* pagination info, if applicable */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

### Pagination Meta
```json
{
  "meta": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 42,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 🎉 What's Next?

Congratulations! If you've made it this far, you have a fully functional expense tracking API. Here are some ideas for extending the functionality:

### 🚀 Enhancement Ideas
- **📈 Analytics Dashboard**: Add endpoints for spending summaries and trends
- **📱 Mobile App**: Build a React Native or Flutter frontend
- **💾 Data Export**: Add CSV/PDF export functionality
- **🔔 Notifications**: Implement spending alerts and budgets
- **👥 Shared Expenses**: Add functionality for splitting bills
- **🏦 Bank Integration**: Connect to banking APIs for automatic expense import

### 🛠️ Technical Improvements
- Add comprehensive unit and integration tests
- Implement caching with Redis
- Add API documentation with Swagger/OpenAPI
- Set up CI/CD pipeline
- Add monitoring and logging (Winston, Morgan)

---

## 🤝 Contributing

We love contributions! Please feel free to submit issues, fork the repository, and create pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

Having trouble? We're here to help!

- 📧 **Email**: support@expense-tracker-api.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/harshvardhan-git/Expense_Tracker_API/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/harshvardhan-git/Expense_Tracker_API/discussions)

---

**Happy expense tracking! 🎉**

Made with ❤️ by Harshvardhan Singh Yadav