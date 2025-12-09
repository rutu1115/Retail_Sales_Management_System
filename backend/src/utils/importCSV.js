import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import sequelize from '../db.js';
import Sale from '../models/Sale.js';

const CSV_PATH = path.join('data', 'sales.csv');

function normalizeRow(row) {
  const normalizeString = v => v?.toString().trim().toLowerCase() || null;
  const tryNumber = v => v ? Number(v) : null;

  return {
    transactionId: tryNumber(row['Transaction ID']),
    date: row['Date'] ? new Date(row['Date']) : null,
    customerId: row['Customer ID']?.trim(),
    customerName: row['Customer Name']?.trim(),
    phoneNumber: row['Phone Number']?.trim(),
    gender: normalizeString(row['Gender']),
    age: tryNumber(row['Age']),
    customerRegion: normalizeString(row['Customer Region']),
    customerType: normalizeString(row['Customer Type']),
    productId: row['Product ID']?.trim(),
    productName: row['Product Name']?.trim(),
    brand: normalizeString(row['Brand']),
    productCategory: normalizeString(row['Product Category']),
    tags: normalizeString(row['Tags']),
    quantity: tryNumber(row['Quantity']),
    pricePerUnit: tryNumber(row['Price per Unit']),
    discountPercentage: tryNumber(row['Discount Percentage']),
    totalAmount: tryNumber(row['Total Amount']),
    finalAmount: tryNumber(row['Final Amount']),
    paymentMethod: normalizeString(row['Payment Method']),
    orderStatus: normalizeString(row['Order Status']),
    deliveryType: normalizeString(row['Delivery Type']),
    storeId: row['Store ID']?.trim(),
    storeLocation: normalizeString(row['Store Location']),
    salespersonId: row['Salesperson ID']?.trim(),
    employeeName: row['Employee Name']?.trim()
  };
}

export async function importCSV() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error('CSV file not found at', CSV_PATH);
    process.exit(1);
  }

  await sequelize.authenticate();
  await Sale.sync();

  const BATCH_SIZE = 1000;
  let batch = [];
  const parser = fs.createReadStream(CSV_PATH).pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const row of parser) {
    batch.push(normalizeRow(row));
    if (batch.length >= BATCH_SIZE) {
      await Sale.bulkCreate(batch, { ignoreDuplicates: true });
      batch = [];
    }
  }

  if (batch.length > 0) {
    await Sale.bulkCreate(batch, { ignoreDuplicates: true });
  }

  console.log('CSV import complete!');
  await sequelize.close();
}
