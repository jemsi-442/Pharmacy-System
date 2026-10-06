# Pharmacy System

A full-stack pharmacy management application for tracking medicines, recording sales, managing staff accounts, and viewing dashboard summaries.

## Features

- Dashboard with pharmacy activity and inventory summaries
- Medicine inventory with batch, expiry date, quantity, and price fields
- Sales recording and sales history
- User management with `admin`, `pharmacist`, and `cashier` roles
- JWT-based API authentication
- Notifications and access-log data models in the backend

## Tech stack

- **Frontend:** React 19, Vite, React Router, Axios, Recharts, Tailwind CSS
- **Backend:** Node.js, Express, node-postgres (`pg`)
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL 14 or newer, running locally or available through a connection URI

## Run locally

Open two terminals from the repository root.

### 1. Configure and start the backend

Set the PostgreSQL connection values in `backend/.env` (the repository's local configuration uses these defaults):

```env
PORT=5000
PGHOST=127.0.0.1
PGPORT=5432
PGDATABASE=pharmacy_db
PGUSER=postgres
# Optional; omit if your local PostgreSQL user does not require a password.
PGPASSWORD=your-postgres-password
JWT_SECRET=replace-with-a-long-random-secret
```

You can use `DATABASE_URL=postgresql://user:password@host:5432/database` instead of the `PG*` connection settings. Ensure the target database already exists. On startup, the API creates its tables and indexes if needed.

Then install dependencies and start the API:

```bash
cd backend
npm install
npm run dev
```

The API listens on `http://localhost:5000`. Its root route returns `Pharmacy API is running`.

### 2. Configure and start the frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Then run the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). If this is a new empty database, select **Set up the first admin account** on the login screen. After that account exists, add other accounts from the Users page; public setup is disabled.

## API routes

The API returns JSON and uses bearer tokens for protected routes. Sign in or register at `/api/auth/login` or `/api/auth/register`; use the returned token in the `Authorization: Bearer <token>` header.

| Route | Methods | Purpose |
|---|---|---|
| `/api/auth/register` | `POST` | One-time first-admin setup; disabled after the first account |
| `/api/auth/login` | `POST` | Sign in and get a JWT |
| `/api/medicine` | `GET`, `POST` | List and add medicines |
| `/api/medicine/:id` | `GET`, `PUT`, `DELETE` | Read, update, or remove a medicine |
| `/api/medicines` | Same methods as `/api/medicine` | Plural alias used by the frontend |
| `/api/sales` | `GET`, `POST` | List sales and record a sale |
| `/api/notifications` | `GET`, `POST` | List and create notifications |
| `/api/notifications/:id` | `DELETE` | Remove a notification |
| `/api/users` | `GET`, `POST` | List and create users |
| `/api/users/:id` | `PUT`, `DELETE` | Update or remove a user |

All listed routes require authentication except registration and login. User and access-log routes require an admin account. Access-log routes are also available at `/api/users/access-log`.

## Project layout

```text
backend/
  config/       PostgreSQL connection and schema
    schema.sql  PostgreSQL tables and indexes
  controllers/  API request handlers
  middleware/   JWT authentication middleware
  routes/       Express route definitions
  server.js     API entry point
frontend/
  src/features/ Dashboard, medicines, sales, and users screens
  src/app/      Application routing
```

## Available scripts

From `backend/`:

- `npm run dev` — start the API with Nodemon
- `npm start` — start the API with Node

From `frontend/`:

- `npm run dev` — start Vite
- `npm run build` — create a production build in `frontend/dist`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint

## Notes

- Configure `JWT_SECRET` with a strong private value and keep `.env` files out of version control.
- The schema setup creates empty PostgreSQL tables; existing MongoDB records are not copied automatically.
- Public account setup is limited to the first account. For production, configure HTTPS and review the deployment's access controls.
- No hosted demo or screenshot assets are currently configured in this repository.
