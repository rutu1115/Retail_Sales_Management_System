import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

/**
 * Maps CSV row to the Sale model fields and normalizes strings for filtering
 */
function coerceRow(row) {
  const tryNumber = (v) => {
    if (!v || v === '') return null;
    const n = Number(v);
    return Number.isNaN(n) ? v : n;
  };

  const normalizeString = (v) => (v ? v.trim() : null);

  return {
    transactionId: tryNumber(row['Transaction ID']),
    date: row['Date'] ? new Date(row['Date']) : null,
    customerId: normalizeString(row['Customer ID']),
    customerName: normalizeString(row['Customer Name']),
    phoneNumber: normalizeString(row['Phone Number']),
    gender: normalizeString(row['Gender']),
    age: tryNumber(row['Age']),
    customerRegion: normalizeString(row['Customer Region']),
    customerType: normalizeString(row['Customer Type']),
    productId: normalizeString(row['Product ID']),
    productName: normalizeString(row['Product Name']),
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
    storeId: normalizeString(row['Store ID']),
    storeLocation: normalizeString(row['Store Location']),
    salespersonId: normalizeString(row['Salesperson ID']),
    employeeName: normalizeString(row['Employee Name'])
  };
}

/**
 * Loads CSV into memory and returns array of normalized rows
 */
export async function loadCSVIntoMemory(filepath) {
  const records = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filepath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => records.push(coerceRow(row)))
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err));
  });
}
