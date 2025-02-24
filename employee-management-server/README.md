# 👨‍💼 Employee Management (Backend)

## 📌 Project Overview

The **Employee Management System** is a **backend API** developed with **Node.js, Express, MongoDB, and GraphQL** to handle employee records efficiently. It provides functionalities to **add, update, delete, and retrieve employee details** through GraphQL queries and mutations.

This project demonstrates skills in **GraphQL API development, database integration, and backend architecture**.

This project was developed as part of a **college final group project**.

---

## 🚀 Features

- 📄 **GraphQL API** – Efficient data retrieval and management with GraphQL.
- 🏛 **MongoDB Integration** – NoSQL database for storing employee records.
- 🔧 **CRUD Operations** – Add, update, delete, and retrieve employees.
- 🔀 **Scalable Architecture** – Uses Apollo Server and Express.
- 🔐 **Environment Configuration** – Uses `.env` for sensitive configurations.

---

## 🤦‍💻 Technologies Used

- **Back-End** → Node.js, Express.js
- **Database** → MongoDB
- **API** → GraphQL (Apollo Server)
- **Environment Variables** → dotenv
- **Dependency Management** → npm

---

## 📌 Project Purpose

This project demonstrates:

- **Backend API Development:** Implementation of GraphQL API using Apollo Server and Express.js.
- **Database Management:** Efficient data handling using MongoDB and Mongoose.
- **Scalable Architecture:** Modularized structure ensuring scalability and maintainability.
- **Security Best Practices:** Secure handling of environment variables and API endpoints.
- **Optimized Query Handling:** Leveraging GraphQL for efficient data retrieval and manipulation.

---

## 🏛 GraphQL Schema

### 🔍 Queries
- `EmployeeDirectory`: Fetches the list of all employees.
- `getEmployeeById(id: String)`: Retrieves details of a specific employee by ID.

### ✏️ Mutations
- `addEmployee(employee: EmployeeInput)`: Adds a new employee.
- `deleteEmployee(id: String)`: Deletes an employee by ID.
- `updateEmployee(id: String, employee: EmployeeInput)`: Updates an existing employee’s information.

---

## 📂 Project Structure

```
📁 employee-management-server
 ├── 📁 node_modules/           # Node dependencies
 ├── 📜 .env                    # Environment variables
 ├── 📜 .env.example            # Example environment file
 ├── 📜 .gitignore              # Git ignore rules
 ├── 📜 package.json            # Dependencies and scripts
 ├── 📜 package-lock.json       # Dependency lock file
 ├── 📜 README.md               # Project documentation
 ├── 📜 db.js                   # Database connection setup
 ├── 📜 schema.graphql          # GraphQL schema definition
 ├── 📜 server.js               # Main Express server file
```

---

## 🏃‍♂️ How to Run

1️⃣ Clone the repository:
```bash
git clone https://github.com/jjacoboflorez95/employee-management.git
```

2️⃣ Navigate to the project directory:
```bash
cd employee-management-server
```

3️⃣ Install dependencies:
```bash
npm install
```

4️⃣ Set up environment variables in a `.env` file:
```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&appName=<appName>
```

5️⃣ Start the application:
```bash
npm run dev
```

6️⃣ Access GraphQL Playground:
```plaintext
http://localhost:5003/graphql
```

---

## 📝 License

This project was developed for **educational purposes**.

---

## 💼 Author

👤 **Juan Jacobo Florez Monroy**  
🌐 **Portfolio**: [jjacobo95.com](https://jjacobo95.com)  
🐙 **GitHub**: [github.com/jjacoboflorez95](https://github.com/jjacoboflorez95)