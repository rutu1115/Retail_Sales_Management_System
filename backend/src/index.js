import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import Sale from './models/Sale.js';
import salesRoute from './routes/sales.js';
import { importCSV } from './importSales.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend running'));
app.use('/api/sales', salesRoute);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to Postgres');

    await Sale.sync();
    console.log('Sale model synced');

    // Check if table is empty
    const count = await Sale.count();
    if (count === 0) {
      console.log('No data found, importing CSV...');
      importCSV('data/sales.csv')
        .then(() => console.log('CSV import completed!'))
        .catch(err => console.error('CSV import failed', err));
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (err) {
    console.error('Unable to start server', err);
    process.exit(1);
  }
})();
