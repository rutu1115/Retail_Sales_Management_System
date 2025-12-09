const { Op, Sequelize } = require('sequelize');
const Sale = require('../models/Sale');

/**
 * Build where clause from filters & search
 */
function buildWhere({ q, filters = {} }) {
  const where = [];

  // 🔍 Search
  if (q && q.trim() !== '') {
    const qStr = q.trim();

    // Support:
    // - First name only → "Neha"
    // - First + last name → "Neha Khan"
    // - Partial typing → "Neha K"
    const parts = qStr.split(" ");
    const first = parts[0];
    const last = parts.length > 1 ? parts.slice(1).join(" ") : null;

    const searchConds = {
      [Op.or]: [
        // Full name starts
        { customerName: { [Op.iLike]: `${qStr}%` } },

        // If user typed 2+ words → check "first last"
        ...(last
          ? [{ customerName: { [Op.iLike]: `${first}%${last}%` } }]
          : []
        ),

        // Any word starts with query
        { customerName: { [Op.iLike]: `% ${qStr}%` } },

        // Phone starts with query
        { phoneNumber: { [Op.iLike]: `${qStr}%` } },
      ]
    };

    where.push(searchConds);
  }

  // 🌍 Regions
  if (filters.regions?.length) {
    where.push({ customerRegion: { [Op.in]: filters.regions } });
  }

  // 🚻 Genders
  if (filters.genders?.length) {
    where.push({ gender: { [Op.in]: filters.genders } });
  }

  // 🎂 Age Range
  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    const min = filters.ageMin ?? 0;
    const max = filters.ageMax ?? 200;
    where.push({ age: { [Op.between]: [min, max] } });
  }

  // 🛍 Product categories
  if (filters.productCategories?.length) {
    where.push({ productCategory: { [Op.in]: filters.productCategories } });
  }

  // 🏷 Tags
  if (filters.tags?.length) {
    const tagConds = filters.tags.map(tag => ({
      tags: { [Op.iLike]: `%${tag}%` }
    }));
    where.push({ [Op.or]: tagConds });
  }

  // 💳 Payment Methods
  if (filters.paymentMethods?.length) {
    where.push({ paymentMethod: { [Op.in]: filters.paymentMethods } });
  }

  // 📅 Date range
  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom ? new Date(filters.dateFrom) : new Date('1970-01-01');
    const to = filters.dateTo ? new Date(filters.dateTo) : new Date('9999-12-31');
    where.push({ date: { [Op.between]: [from, to] } });
  }

  return where.length ? { [Op.and]: where } : {};
}

/**
 * querySales - query DB with filters, sort, pagination
 */
async function querySales(options) {
  const {
    q,
    filters = {},
    sortBy = 'date',
    sortDir = 'desc',
    page = 1,
    pageSize = 10
  } = options;

  const where = buildWhere({ q, filters });

  // 🔽 Sorting
  let order = [];
  const normalizedDir = sortDir.toUpperCase();

  if (sortBy === 'customerName') {
    order.push([
      Sequelize.fn('lower', Sequelize.col('customerName')),
      normalizedDir
    ]);
  } else {
    order.push([sortBy, normalizedDir]);
  }

  const offset = (Math.max(Number(page), 1) - 1) * pageSize;

  const { count, rows } = await Sale.findAndCountAll({
    where,
    order,
    offset,
    limit: Number(pageSize)
  });

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return {
    meta: {
      total: count,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages
    },
    data: rows
  };
}

module.exports = { querySales };
