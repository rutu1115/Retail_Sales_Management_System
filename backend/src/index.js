// index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import Sale from './models/Sale.js';
import salesRoute from './routes/sales.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('Backend running'));

// API routes
app.use('/api/sales', salesRoute);

(async () => {
  try {
    // Connect to DB
    await sequelize.authenticate();
    console.log('Connected to Postgres');

    // Sync Sale model (creates table if not exists)
    await Sale.sync();
    console.log('Sale model synced');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server', err);
    process.exit(1);
  }
})();
