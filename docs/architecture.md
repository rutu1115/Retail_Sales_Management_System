# 🏗️ Architecture Document  
**Retail Sales Management System**  
Location: `/docs/architecture.md`

---

# 1. Backend Architecture

The backend is a lightweight **Node.js + Express** service that loads the entire CSV dataset into memory at startup. Once loaded, the backend exposes a single API endpoint (`/api/sales`) that supports **search**, **filtering**, **sorting**, and **pagination**.

### **Key Components**
- **Express Server** – Handles API routing and request validation.
- **CSV Loader** – Reads `sales.csv` at startup and converts rows into structured JSON objects.
- **Query Engine (`querySales`)**  
  Responsible for:
  - Multi-word search  
  - Full-name search  
  - Word-based matching  
  - Phone match  
  - Complex filters  
  - Sorting  
  - Pagination
- **Service Layer (salesService.js)**  
  Acts as a wrapper around the query engine and exposes it to controllers.
- **Controller Layer (salesController.js)**  
  Accepts HTTP requests, extracts parameters, and sends responses.

### **Backend Principles**
- Fully in-memory operations for speed  
- Zero external DB dependencies  
- Pure functional processing of dataset  
- Consistent response structure  
- Safe handling of invalid parameters

---

# 2. Frontend Architecture

The frontend is a **React + Vite** SPA with modular UI components and a data-driven layout. The app fetches processed results from the backend via Axios.

### **Key Components**
- **SearchBar** – Text-based querying of customer name/phone.
- **FilterPanel** – Multi-select filters for region, gender, category, tags, etc.
- **SortingDropdown** – Controls sort field and direction.
- **StatCards** – Shows summary statistics.
- **TransactionsTable** – Displays paginated results.
- **PaginationControls** – Navigates between pages.
- **API Service (`api.js`)** – Encapsulates all backend calls.

### **Frontend Principles**
- Unidirectional data flow  
- URL parameters not stored in UI (internal state only)  
- Responsive grid-based layout  
- Clean separation of presentation & logic components  
- Debounced search (optional extension)

---

# 3. Data Flow

Below is the full data lifecycle from load to UI:

### **Startup Phase**
1. Backend loads `/backend/data/sales.csv`
2. CSV Loader parses each row → JavaScript objects  
3. Records are stored in memory inside `salesService.js`

### **Request Phase**
1. Frontend sends request:
2. Backend controller receives parameters
3. Controller → Query Engine
4. Query Engine processes:
- Search (first, last, full name)
- Filters (region, gender, category, age range…)
- Sorting (date, quantity, customerName)
- Pagination
---

## 4. Folder Structure

### **Backend Folder Structure**


---

### **Frontend Folder Structure**


---

## 9. Module Responsibilities

### **Backend Modules**
| Module | Responsibility |
|--------|----------------|
| `csvLoader.js` | Loads the CSV file and converts rows into JSON objects |
| `salesService.js` | Stores the dataset and provides data query interface |
| `querySales.js` | Core engine: search, filters, sorting, pagination |
| `salesController.js` | Receives requests, validates parameters, forms responses |
| `routes/sales.js` | Maps `/api/sales` route to controller |
| `index.js` | Bootstraps server, middleware, and API routing |

---

### **Frontend Modules**
| Component | Responsibility |
|-----------|----------------|
| `SearchBar.jsx` | Handles user text search input |
| `FilterPanel.jsx` | Displays all filters and updates filter state |
| `SortingDropdown.jsx` | Controls sorting field and direction |
| `StatCards.jsx` | Displays summary statistics (total, averages, etc.) |
| `TransactionsTable.jsx` | Renders paginated results table |
| `PaginationControls.jsx` | Handles page navigation |
| `api.js` | Axios-based API client to fetch `/api/sales` data |
| `App.jsx` | Main logic: manages state, calls backend, renders UI |
| `main.jsx` | React entry point and app mounting |

---


