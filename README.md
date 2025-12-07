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

## **3. Search Implementation Summary**
The backend includes a multi-level, case-insensitive search mechanism that supports:
- First name queries — `"neha"`  
- Last name queries — `"patil"`  
- Full name queries — `"neha patil"`  
- Partial multi-word queries — `"neha pa"`  
- Exact phone number matching  

Search is performed using:
- Word-level `startsWith`  
- Full-name `startsWith`  
- Exact word match  
- Phone equality  

This ensures accurate search results even with partial inputs.

---

## **4. Filter Implementation Summary**
Filters are applied sequentially and support the following fields:
- Customer Region  
- Gender  
- Age Range  
- Product Category  
- Tags (multi-value CSV)  
- Payment Method  
- Date Range  

Multi-select filters use sets for efficient lookups. Only rows satisfying **all active filters** are included in the final dataset.

---

## **5. Sorting Implementation Summary**
The backend supports sorting by:
- `date` (default, newest first)  
- `quantity`  
- `customerName`  
- Any other field via generic fallback  

Sorting uses Lodash `orderBy` for stable and reliable ascending/descending ordering.

---

## **6. Pagination Implementation Summary**
Server-side pagination returns:
{
"total": <total-records>,
"page": <current-page>,
"pageSize": <rows-per-page>,
"totalPages": <computed-pages>,
"data": [ ...paged records ]
}

---

## 📋 Prerequisites

- Node.js v16+  
- CSV dataset (`sales.csv`)  
- Git  
- Modern web browser  

---

## 🚀 Setup Instructions

### 📦 Backend Setup

```bash
cd backend
npm install
npm run dev

--- 

### 📦 Frontend Setup

```bash
cd frontend
npm install
npm run dev

---
