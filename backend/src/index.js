const express = require('express');
const cors = require('cors');
const salesRoute = require('./routes/sales');
const csvLoader = require('./utils/csvLoader');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use(cors());
app.use(express.json());

// Load dataset into memory at startup and attach to app.locals
csvLoader.loadCSVIntoMemory(__dirname + '/../data/sales.csv')
  .then((records) => {
    console.log(`Loaded ${records.length} records into memory`);
    app.locals.sales = records;

    // routes
    app.use('/api/sales', (req, res, next) => {
      // attach data to request for controllers/services
      req.salesData = app.locals.sales;
      next();
    }, salesRoute);

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });

  })
  .catch(err => {
    console.error('Failed to load CSV', err);
    process.exit(1);
  });

module.exports = app;
