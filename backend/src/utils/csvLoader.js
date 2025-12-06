const fs = require('fs');
const { parse } = require('csv-parse');   // <-- FIXED IMPORT
const path = require('path');

function coerceRow(row) {
  const normalized = {};
  for (const key in row) {
    const value = row[key].trim();
    normalized[key.trim()] = value;
  }

  const tryNumber = (v) => {
    if (v === '') return null;
    const n = Number(v);
    return Number.isNaN(n) ? v : n;
  };

  return {
    ...normalized,
    quantity: tryNumber(normalized['Quantity']),
    pricePerUnit: tryNumber(normalized['Price per Unit']),
    discountPercentage: tryNumber(normalized['Discount Percentage']),
    totalAmount: tryNumber(normalized['Total Amount']),
    finalAmount: tryNumber(normalized['Final Amount']),
    date: normalized['Date'],
    customerName: normalized['Customer Name'],
    phoneNumber: normalized['Phone Number'],
    productCategory: normalized['Product Category'],
    tags: normalized['Tags'],
    gender: normalized['Gender'],
    age: tryNumber(normalized['Age']),
    customerRegion: normalized['Customer Region'],
    paymentMethod: normalized['Payment Method'],
    orderStatus: normalized['Order Status'],
    storeLocation: normalized['Store Location'],
    employeeName: normalized['Employee Name']
  };
}

function loadCSVIntoMemory(filepath) {
  return new Promise((resolve, reject) => {
    const records = [];

    fs.createReadStream(filepath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => records.push(coerceRow(row)))
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err));
  });
}

module.exports = { loadCSVIntoMemory };
