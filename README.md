# AccessBoard RBAC API

Backend API for AccessBoard, a dynamic RBAC admin panel. The server handles JWT authentication, user management, role management, permission discovery, and route-level permission enforcement.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- bcrypt

## Features

- JWT login and authenticated user lookup
- User CRUD with active status support
- Role CRUD with dynamic permission arrays
- Many-to-many user-role assignment
- Permission guards for protected API routes
- Seeded demo admin account and starter roles

## Auth Flow

1. A user logs in with email and password.
2. The API validates the password with bcrypt.
3. The API returns a JWT containing the user id.
4. Protected routes verify the JWT with `authMiddleware`.
5. Permission guards load the user's roles and allow access only when the user has the required permission.

## Permission Model

Users can have multiple roles. Roles contain permission strings such as:

```txt
user:create
user:list
role:update
role:assign
```

The current permission groups are:

- `USER`: create, read, update, delete, list
- `ROLE`: create, read, update, delete, list, assign

## Setup

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secret"
PORT=5000
CLIENT_ORIGIN="http://localhost:5173"
```

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed demo data:

```bash
npx prisma db seed
```

Start the dev server:

```bash
npm run dev
```

## Demo Credentials

These credentials are for local demo and portfolio review only.

```txt
Email: admin@example.com
Password: Admin@123
```

Seeded roles:

- `ADMIN`: Full access to users, roles, and permissions
- `USER`: Basic self-read access

## API Endpoints

### Health

```txt
GET /
```

Returns the API name and status.

### Users

```txt
POST   /api/user/login
GET    /api/user/me
POST   /api/user
GET    /api/user
GET    /api/user/:id
PATCH  /api/user/:id
PATCH  /api/user/:id/password
PATCH  /api/user/:id/roles
DELETE /api/user/:id
```

### Roles

```txt
POST   /api/role
GET    /api/role
GET    /api/role/permissions
GET    /api/role/:id
PATCH  /api/role/:id
DELETE /api/role/:id
```

## Notes

This backend is intentionally focused on RBAC administration rather than a larger domain product. It is designed to showcase authentication, authorization, data modeling, protected routes, and frontend-friendly permission APIs.
