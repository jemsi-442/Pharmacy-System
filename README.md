# 🏥 Pharmacy-System

![Status](https://img.shields.io/badge/status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-16-green)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

A **full-stack Pharmacy Management System** with secure inventory tracking, sales management, and admin dashboard.  
Designed for small to medium-sized pharmacies to efficiently manage medicines, sales, and staff operations.

---

## 💡 Features

### Backend (Node.js)
- REST API for medicines, sales, and user management
- Role-based access control: `admin` and `staff`
- Secure password storage (hashed & salted)
- Middleware for authentication and authorization
- Audit logging for user actions and login attempts

### Frontend (HTML/CSS/JS)
- Admin dashboard to manage inventory, sales, and staff
- Responsive pages for mobile and desktop
- Sales tracking & reporting views
- Notifications for low stock or expired medicines

### Database (MySQL)
- **Users** table for staff credentials and roles
- **Medicines** table for inventory tracking with expiry dates
- **Sales** table linking medicines, quantity sold, and staff
- **AccessLog** table for audit trail (logins, logouts, password resets)
- Fully transactional with InnoDB engine

---

## 🖼️ Screenshots

![Admin Dashboard](docs/screenshots/admin-dashboard.png)  
*Dashboard overview showing inventory and sales analytics*

![Sales Tracking](docs/screenshots/sales-tracking.png)  
*Detailed sales and transaction tracking page*

> **Tip:** Replace placeholders with your actual screenshots.

---

## 🗂️ Tech Stack

| Layer        | Technology / Tools             |
|-------------|--------------------------------|
| Backend     | Node.js, Express.js             |
| Frontend    | HTML5, CSS3, Vanilla JS         |
| Database    | MySQL, InnoDB                   |
| Authentication | JWT, bcrypt/argon2             |
| Version Control | Git & GitHub                 |

---

## 🚀 Live Demo

Frontend is currently static. Backend API available locally.  
Future deployment link: `[Add URL when deployed]`

---

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MySQL
- Git

### Steps
1. Clone the repository
```bash
git clone https://github.com/jemsi-442/Pharmacy-System.git
cd Pharmacy-System/backend




