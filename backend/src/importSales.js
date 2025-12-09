import fs from 'fs';
import csv from 'csv-parser';
import Sale from './models/Sale.js'; // ESM import

const BATCH_SIZE = 1000;
let batch = [];

async function importCSV(filePath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        batch.push(formatRow(row));

        if (batch.length >= BATCH_SIZE) {
          stream.pause();
          try {
            await Sale.bulkCreate(batch, { validate: false, logging: false });
            batch = [];
            stream.resume();
          } catch (err) {
            reject(err);
          }
        }
      })
      .on('end', async () => {
        try {
          if (batch.length > 0) {
            await Sale.bulkCreate(batch, { validate: false, logging: false });
          }
          console.log('CSV import completed!');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
}

// Map CSV row to Sale model fields
function formatRow(row) {
  return {
    transactionId: Number(row['Transaction ID']),
    date: new Date(row['Date']),
    customerId: row['Customer ID'],
    customerName: row['Customer Name'],
    phoneNumber: row['Phone Number'],
    gender: row['Gender'],
    age: Number(row['Age']),
    customerRegion: row['Customer Region'],
    customerType: row['Customer Type'],
    productId: row['Product ID'],
    productName: row['Product Name'],
    brand: row['Brand'],
    productCategory: row['Product Category'],
    tags: row['Tags'],
    quantity: Number(row['Quantity']),
    pricePerUnit: Number(row['Price per Unit']),
    discountPercentage: Number(row['Discount Percentage']),
    totalAmount: Number(row['Total Amount']),
    finalAmount: Number(row['Final Amount']),
    paymentMethod: row['Payment Method'],
    orderStatus: row['Order Status'],
    deliveryType: row['Delivery Type'],
    storeId: row['Store ID'],
    storeLocation: row['Store Location'],
    salespersonId: row['Salesperson ID'],
    employeeName: row['Employee Name']
  };
}

export { importCSV };
