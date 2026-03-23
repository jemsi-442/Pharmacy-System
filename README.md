# 🏥 Pharmacy-System INAENDELEA SOON

![Status](https://img.shields.io/badge/status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-16-green)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![License](https://img.shields.io/badge/license-MIT-blue)


A **BACKEND Pharmacy Management System** with secure inventory tracking, sales management, and admin dashboard.  
Designed for small to medium-sized pharmacies to efficiently manage medicines, sales, and staff operations.

---

## 💡 Features

### Backend (Node.js)
- REST API for medicines, sales, and user management
- Role-based access control: `admin` and `staff`
- Secure password storage (hashed & salted)
- Middleware for authentication and authorization
- Audit logging for user actions and login attempts

### Database (MySQL)
- **Users** table for staff credentials and roles
- **Medicines** table for inventory tracking with expiry dates
- **Sales** table linking medicines, quantity sold, and staff
- **AccessLog** table for audit trail (logins, logouts, password resets)
- Fully transactional with InnoDB engine

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




\
