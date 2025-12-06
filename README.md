Overview
This project is a Retail Sales Management System implementing advanced search, multi-select filtering, sorting, and pagination over a sales dataset. It is built with a Node.js Express backend and a React frontend.

Tech Stack
Backend: Node.js, Express, csv-parse, lodash
Frontend: React (Vite), Axios
Dev Tools: nodemon, Vite

Search Implementation Summary
Full-text, case-insensitive search is implemented server-side across `Customer Name` and `Phone Number`. The search string `q` is matched against both fields and can be combined with filters, sorting, and pagination.

Filter Implementation Summary
Filters support multi-select and ranges for: Customer Region, Gender, Age Range, Product Category, Tags (comma-separated), Payment Method, and Date Range. Filters may be used alone or in combination and are processed server-side in a single service function to avoid duplicated logic.

Sorting Implementation Summary
Sorting is implemented server-side with supported fields: `date` (newest/oldest), `quantity`, and `customerName`. Sorting preserves search and filter state.

Pagination Implementation Summary
Server-side pagination with page size default 10. API returns `meta` with `total`, `page`, `pageSize`, and `totalPages`. Frontend provides Next/Previous controls and preserves search/filter/sort context.

Setup Instructions
1. Download dataset from the assignment and place it at `backend/data/sales.csv`.
2. Backend:
   - `cd backend`
   - `npm install`
   - `npm start` (or `npm run dev`)
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
4. Open `http://localhost:5173` (Vite default) for frontend, and ensure backend is at `http://localhost:5000` (or set VITE_API_URL).
