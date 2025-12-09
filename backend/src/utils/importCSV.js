import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import sequelize from '../db.js';
import Sale from '../models/Sale.js';

const CSV_PATH = path.join('data', 'sales.csv');

function normalizeString(value) {
  if (!value) return null;
  return value.toString().trim().toLowerCase(); // lowercase + trim
}

function normalizeRow(row) {
  return {
    transactionId: Number(row['Transaction ID']),
    date: new Date(row['Date']),
    customerId: row['Customer ID']?.trim(),
    customerName: row['Customer Name']?.trim(),
    phoneNumber: row['Phone Number']?.trim(),
    gender: row['Gender']?.trim().toLowerCase(),
    age: Number(row['Age']),
    customerRegion: row['Customer Region']?.trim().toLowerCase(),
    customerType: row['Customer Type']?.trim().toLowerCase(),
    productId: row['Product ID']?.trim(),
    productName: row['Product Name']?.trim(),
    brand: row['Brand']?.trim().toLowerCase(),
    productCategory: row['Product Category']?.trim().toLowerCase(),
    tags: row['Tags']?.trim().toLowerCase(),
    quantity: Number(row['Quantity']),
    pricePerUnit: Number(row['Price per Unit']),
    discountPercentage: Number(row['Discount Percentage']),
    totalAmount: Number(row['Total Amount']),
    finalAmount: Number(row['Final Amount']),
    paymentMethod: row['Payment Method']?.trim().toLowerCase(),
    orderStatus: row['Order Status']?.trim().toLowerCase(),
    deliveryType: row['Delivery Type']?.trim().toLowerCase(),
    storeId: row['Store ID']?.trim(),
    storeLocation: row['Store Location']?.trim().toLowerCase(),
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

  const records = [];
  const parser = fs.createReadStream(CSV_PATH).pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const row of parser) {
    const normalized = await normalizeRow(row);
    records.push(normalized);
    if (records.length >= 1000) {
      await Sale.bulkCreate(records, { ignoreDuplicates: true });
      records.length = 0;
    }
  }

  if (records.length > 0) {
    await Sale.bulkCreate(records, { ignoreDuplicates: true });
  }

  console.log('CSV import complete!');
  await sequelize.close();
}
