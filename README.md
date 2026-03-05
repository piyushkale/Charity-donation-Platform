# Charity Donation Platform

A full-stack web application that allows users to donate to verified charities, track donation history, and enables admins to manage charity approvals.

This project demonstrates backend API development, authentication, role-based authorization, database relationships, and frontend integration using REST APIs.

---

## Features

### User Features
- User registration and login
- Secure authentication using JWT
- Browse approved charities
- Donate to charities
- View personal donation history
- Download donation history as a `.txt` file
- Search charities by name/category/location

### Charity Features
- Charity registration
- Charity dashboard
- View received donations

### Admin Features
- View all charity applications
- Approve or reject charity requests
- Manage platform charities

---

## Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- Bcrypt Password Hashing

### Frontend
- HTML
- TailwindCSS
- JavaScript
- Axios (for API requests)

---

## Database Design

Main entities:

- **Users**
- **Charities**
- **Donations**
- **Impact reports**

### Relationships

- A **User** can make many **Donations**
- A **Charity** can receive many **Donations**
- Each **Donation** belongs to one **User** and one **Charity**

---

## Authentication Flow

1. User registers with email and password.
2. Password is hashed using **bcrypt** before storing in the database.
3. During login, the password is verified using `bcrypt.compare()`.
4. If valid, a **JWT token** is generated.
5. Protected routes verify the token using middleware.

---

## Search Implementation

Charity search is implemented using Sequelize operators.

The search checks multiple columns such as:

- Charity name
- Category
- Location

Results are limited to the **top 3 matches** for performance optimization.

---

## Donation History Download

Users can export their donation history.

Implementation:

- Server dynamically generates text file content
- Response is sent with `Content-Disposition: attachment`
- Frontend receives data as a **Blob**
- Browser triggers download automatically

No file is stored on the server.

---

## Project Structure

```
project
│
├── controllers
├── models
├── routes
├── middleware
├── services
├── config
├── public
│
└── app.js
```

The project follows a **modular MVC-style structure** for maintainability.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/piyushkale/Charity-donation-Platform.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=charity_db
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```



## Author

**Piyush Kale**

---

## License

This project is created for educational purposes.
