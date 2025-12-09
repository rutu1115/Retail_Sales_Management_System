const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sale = sequelize.define(
  "sales",
  {
    transactionId: {
      type: DataTypes.INTEGER,
      field: "transaction_id",
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      field: "date"
    },
    customerId: {
      type: DataTypes.STRING,
      field: "customer_id"
    },
    customerName: {
      type: DataTypes.STRING,
      field: "customer_name"
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: "phone_number"
    },
    gender: {
      type: DataTypes.STRING,
      field: "gender"
    },
    age: {
      type: DataTypes.INTEGER,
      field: "age"
    },
    customerRegion: {
      type: DataTypes.STRING,
      field: "customer_region"
    },
    customerType: {
      type: DataTypes.STRING,
      field: "customer_type"
    },
    productId: {
      type: DataTypes.STRING,
      field: "product_id"
    },
    productName: {
      type: DataTypes.STRING,
      field: "product_name"
    },
    brand: {
      type: DataTypes.STRING,
      field: "brand"
    },
    productCategory: {
      type: DataTypes.STRING,
      field: "product_category"
    },
    tags: {
      type: DataTypes.STRING,
      field: "tags"
    },
    quantity: {
      type: DataTypes.INTEGER,
      field: "quantity"
    },
    pricePerUnit: {
      type: DataTypes.FLOAT,
      field: "price_per_unit"
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
      field: "discount_percentage"
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      field: "total_amount"
    },
    finalAmount: {
      type: DataTypes.FLOAT,
      field: "final_amount"
    },
    paymentMethod: {
      type: DataTypes.STRING,
      field: "payment_method"
    },
    orderStatus: {
      type: DataTypes.STRING,
      field: "order_status"
    },
    deliveryType: {
      type: DataTypes.STRING,
      field: "delivery_type"
    },
    storeId: {
      type: DataTypes.STRING,
      field: "store_id"
    },
    storeLocation: {
      type: DataTypes.STRING,
      field: "store_location"
    },
    salespersonId: {
      type: DataTypes.STRING,
      field: "salesperson_id"
    },
    employeeName: {
      type: DataTypes.STRING,
      field: "employee_name"
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    id: false
  }
);

module.exports = Sale;
