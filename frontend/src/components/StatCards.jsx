import React from "react";

function formatCurrency(v) {
  if (!v && v !== 0) return "-";
  return "₹" + Number(v).toLocaleString();
}

export default function StatCards({ data = [], meta = {}, loading }) {
  // Quick aggregates (sample): total sales in this page, avg qty
  const totalAmount = data.reduce((s, r) => s + (Number(r.finalAmount) || Number(r["Final Amount"]) || 0), 0);
  const totalQty = data.reduce((s, r) => s + (Number(r.quantity) || 0), 0);
  const avgQty = data.length ? (totalQty / data.length).toFixed(1) : 0;

  return (
    <div className="stat-cards">
      <div className="stat-card">
        <div className="stat-title">Page Sales</div>
        <div className="stat-value">{formatCurrency(totalAmount)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Records</div>
        <div className="stat-value">{meta.total || 0}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Avg Qty</div>
        <div className="stat-value">{avgQty}</div>
      </div>
    </div>
  );
}
