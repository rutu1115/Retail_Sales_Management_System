const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const salesRoute = require("./routes/sales");
const csvLoader = require("./utils/csvLoader");

const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Attach empty sales array by default
app.locals.sales = [];

// ---------------------- START SERVER FIRST ----------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // ---------- Attempt to load CSV ONLY if exists ----------
  const csvPath = path.join(__dirname, "../data/sales.csv");

  if (fs.existsSync(csvPath)) {
    console.log("Loading CSV data...");
    csvLoader
      .loadCSVIntoMemory(csvPath)
      .then((records) => {
        app.locals.sales = records;
        console.log(`Loaded ${records.length} records`);
      })
      .catch((err) =>
        console.error("Error loading CSV (non-fatal):", err.message)
      );
  } else {
    console.warn("⚠️ CSV not found — skipping sales data load");
  }
});

// Attach sales to API
app.use("/api/sales", (req, res, next) => {
  req.salesData = app.locals.sales;
  next();
}, salesRoute);

// ------------------- SERVE FRONTEND IN PRODUCTION -------------------
const frontendPath = path.join(__dirname, "../frontend/dist");

if (fs.existsSync(frontendPath)) {
  console.log("Serving frontend build...");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.warn("⚠️ Frontend build not found");
}

module.exports = app;
