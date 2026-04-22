# 📌 Task Management System (Node.js + SQL)

## 📖 Overview
Task Management System is a backend project built with **Node.js, Express, and SQL**.  
It follows a **Layered Architecture (MVC)** and includes **Validation, Authentication, Error Handling, and Testing**.  
The goal is to provide a scalable and secure system for managing tasks with role-based access.

---

## ✨ Features
- ➕ **Add Task**: Create new tasks with validation.  
- ✅ **Mark as Done**: Update task status.  
- ✏️ **Update Task**: Edit task details securely.  
- 🗑️ **Delete Task**: Remove tasks with proper authorization.  
- 📋 **Display Tasks**: Show all tasks with pagination.  
- 🔐 **Authentication**: Register/Login using JWT + bcrypt for password hashing.  
- 👥 **Role Management**: Admin/User roles with access control.  
- ⚠️ **Error Handling**: Centralized error handling with custom middleware.  

---

## 🛠️ Tech Stack
- **Language**: JavaScript (Node.js)  
- **Framework**: Express.js  
- **Database**: MySQL / PostgreSQL  
- **Authentication**: JWT, bcrypt  
- **Architecture**: MVC + Layered (Routes → Controllers → Services → Repositories → DB)  
- **Validation**: Middleware-based input validation  
- **Testing**: Jest + Supertest 
