require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Sale = require('./models/Sale');
const salesRoute = require('./routes/sales');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.send('Backend running'));

// API
app.use('/api/sales', salesRoute);

// sync DB & start
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to Postgres');

    // Create table if doesn't exist
    await Sale.sync();
    console.log('Sale model synced');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server', err);
    process.exit(1);
  }
})();
