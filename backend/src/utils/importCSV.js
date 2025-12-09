/**
 * importCSV.js
 * Usage: set DATABASE_URL in .env and run:
 *   npm run import:csv
 * This script reads backend/data/sales.csv and bulk inserts into 'sales' table.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const sequelize = require('../db');
const Sale = require('../models/Sale');

const CSV_PATH = path.join(__dirname, '..', '..', 'data', 'sales.csv');

async function normalizeRow(row) {
  // Map CSV columns to model fields. Adjust keys if your CSV headers differ.
  const mapped = {
    customerName: row['Customer Name'] || row['customer_name'] || row['customerName'] || null,
    phoneNumber: row['Phone Number'] || row['phone_number'] || row['phoneNumber'] || null,
    gender: row['Gender'] || null,
    age: row['Age'] ? Number(row['Age']) : null,
    customerRegion: row['Customer Region'] || row['customer_region'] || null,
    productCategory: row['Product Category'] || row['product_category'] || null,
    tags: row['Tags'] || null,
    quantity: row['Quantity'] ? Number(row['Quantity']) : null,
    pricePerUnit: row['Price per Unit'] ? Number(row['Price per Unit']) : null,
    totalAmount: row['Total Amount'] ? Number(row['Total Amount']) : null,
    finalAmount: row['Final Amount'] ? Number(row['Final Amount']) : null,
    date: row['Date'] ? new Date(row['Date']) : null,
    paymentMethod: row['Payment Method'] || null,
    orderStatus: row['Order Status'] || null,
    storeLocation: row['Store Location'] || null,
    employeeName: row['Employee Name'] || null
  };
  return mapped;
}

async function importCSV() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error('CSV file not found at', CSV_PATH);
    process.exit(1);
  }

  console.log('Connecting to DB...');
  await sequelize.authenticate();
  console.log('Connected to DB.');

  // Ensure table exists
  await Sale.sync(); // safe: creates table if not exists

  const records = [];
  const parser = fs.createReadStream(CSV_PATH).pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const row of parser) {
    const normalized = await normalizeRow(row);
    records.push(normalized);
    // Insert in chunks to avoid huge memory usage
    if (records.length >= 1000) {
      await Sale.bulkCreate(records, { ignoreDuplicates: true });
      console.log('Inserted 1000 rows...');
      records.length = 0;
    }
  }

  if (records.length > 0) {
    await Sale.bulkCreate(records, { ignoreDuplicates: true });
    console.log(`Inserted final ${records.length} rows`);
  }

  console.log('Import complete.');
  await sequelize.close();
  process.exit(0);
}

importCSV().catch(err => {
  console.error('Import failed', err);
  process.exit(1);
});
