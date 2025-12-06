# TruEstate Backend

This is the backend for the TruEstate sales management assignment. It loads the provided CSV at startup and exposes `/api/sales`.

## Setup
1. Place `sales.csv` (dataset) in `backend/data/sales.csv`.
2. `cd backend && npm install`
3. `npm run dev` (nodemon) or `npm start`

API: `GET /api/sales` with query params (see docs/architecture.md)
