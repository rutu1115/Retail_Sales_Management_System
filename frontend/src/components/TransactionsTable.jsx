import React from 'react';

export default function TransactionsTable({ data = [], loading }) {
  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No results found</div>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Product Category</th>
          <th>Quantity</th>
          <th>Payment</th>
          <th>Final Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, idx) => (
          <tr key={idx}>
            <td>{r.date}</td>
            <td>{r.customerName || r['Customer Name']}</td>
            <td>{r['Phone Number'] || r.phoneNumber}</td>
            <td>{r.productCategory || r['Product Category']}</td>
            <td>{r.quantity}</td>
            <td>{r.paymentMethod || r['Payment Method']}</td>
            <td>{r.finalAmount || r['Final Amount']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}