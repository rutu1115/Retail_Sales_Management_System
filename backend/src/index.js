const express = require('express');
const cors = require('cors');
const path = require('path');
const salesRoute = require('./routes/sales');
const csvLoader = require('./utils/csvLoader');

const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ---------- LOAD CSV INTO MEMORY ----------
csvLoader.loadCSVIntoMemory(path.join(__dirname, '/../data/sales.csv'))
  .then((records) => {
    console.log(`Loaded ${records.length} records into memory`);
    app.locals.sales = records;

    // Attach sales data to requests
    app.use('/api/sales', (req, res, next) => {
      req.salesData = app.locals.sales;
      next();
    }, salesRoute);

    // ----------- SERVE REACT BUILD IN PRODUCTION -----------
    const frontendPath = path.join(__dirname, '../frontend/dist');

    if (process.env.NODE_ENV === 'production') {
      console.log("Serving React build...");

      // Serve static files
      app.use(express.static(frontendPath));

      // All non-API routes → index.html
      app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
      });
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  })
  .catch(err => {
    console.error('Failed to load CSV', err);
    process.exit(1);
  });

module.exports = app;
