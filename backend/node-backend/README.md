# Village Health Backend (Node.js + Express + MongoDB)

Quick start:

1. Copy `.env.example` to `.env` and update values (MONGO_URI, JWT_SECRET)
2. Install dependencies:

```
cd backend/node-backend
npm install
```

3. Seed initial admin user:

```
npm run seed
```

4. Start server:

```
npm run dev
```

APIs (high level):
- POST /api/register — register user
- POST /api/login — user login (returns JWT)
- POST /api/admin/login — admin login (returns JWT)
- GET /api/medicine — list medicines
- POST /api/medicine — create medicine (admin)
- GET /api/healthcamps — list camps
- POST /api/healthcamps — create camp (admin)
- POST /api/prescriptions — upload prescription (user)
- GET /api/admin/prescriptions — admin lists pending
- PATCH /api/admin/prescriptions/:id — admin accept/reject