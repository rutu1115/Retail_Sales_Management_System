# 🌟 Retail Sales Management System – Full Stack Application

A modern, responsive **Retail Sales Management System** built with **React, Node.js, and Express** to manage sales data with powerful search, filtering, sorting, and and pagination features. The application loads the dataset from a CSV file and provides a clean UI for exploring sales records.

---

## 🚀 Features

- 🔍 **Smart Search**: Search customers by name/phone with intelligent matching (Neha ≠ Sneha).  
- 🎯 **Advanced Filtering**: Filter by region, gender, age, product category, tags, payment method, and date range.  
- ↕️ **Server-Side Sorting**: Sort by name, date, quantity, or final amount.  
- 📄 **Pagination**: Efficient server-side pagination for large datasets.  
- 📊 **CSV Data Loading**: Loads sales dataset at backend startup for fast querying.  
- 🎨 **Modern UI**: Clean, responsive, and professional interface with custom styling.  
- ⚡ **High Performance**: Optimized filtering pipeline with Lodash utilities.  
- 🛡️ **Validated Inputs**: Secure API handling with strict parameter validation.  

---

## ⚙️ Technologies Used

- **Frontend**: React.js, Vite, CSS3  
- **Backend**: Node.js, Express.js  
- **Data Source**: CSV File (In-Memory Loading)  
- **Utilities**: Lodash, csv-parser  
- **HTTP Client**: Axios  
- **Tooling**: Nodemon, Postman  
- **Styling**: Custom CSS with modern UI components  

---

## 🛠️ How It Works

1. **CSV Loader**: Backend loads and parses `sales.csv` at startup.  
2. **API Layer**: `/api/sales` endpoint accepts query parameters for searching, sorting, filtering, and pagination.  
3. **Search System**: Smart word-level matching to avoid partial mismatches (Neha ≠ Sneha).  
4. **Filtering Engine**: Multi-select filters applied on region, gender, category, tags, etc.  
5. **Sorting Logic**: Server-side sorting ensures accurate results.  
6. **Frontend UI**: React components display search results with filters, paginated table, and sort dropdown.  
7. **Real-Time Updates**: The frontend fetches updated records via Axios whenever filters or search terms change.

---

## 📋 Prerequisites

- Node.js v16+  
- CSV dataset (`sales.csv`)  
- Git  
- Modern web browser  

---

## 🚀 Quick Start

### 📦 Backend Setup

```bash
cd backend
npm install
