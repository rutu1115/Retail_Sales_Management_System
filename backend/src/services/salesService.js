import { Op, Sequelize } from 'sequelize';
import Sale from '../models/Sale.js';

function buildWhere({ q, filters = {} }) {
  const where = [];

  // customerName partial match (starts with)
  if (q?.trim()) {
    const qStr = q.trim().toLowerCase();
    where.push({
      customerName: { [Op.iLike]: `${qStr}%` } // starts with
    });
  }

  // exact match filters
  const addExactFilter = (field, values) => {
    if (!values?.length) return;
    const normalized = values.map(v => v.toLowerCase().trim());
    where.push({ [field]: { [Op.in]: normalized } });
  };

  addExactFilter('paymentMethod', filters.paymentMethods);
  addExactFilter('productCategory', filters.productCategories);
  addExactFilter('customerRegion', filters.regions);
  addExactFilter('gender', filters.genders);

  // tags (partial match)
  if (filters.tags?.length) {
    const tagsConditions = filters.tags.map(tag => ({
      tags: { [Op.iLike]: `%${tag.toLowerCase().trim()}%` }
    }));
    where.push({ [Op.or]: tagsConditions });
  }

  // age
  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    const min = filters.ageMin ?? 0;
    const max = filters.ageMax ?? 200;
    where.push({ age: { [Op.between]: [min, max] } });
  }

  // date range
  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom ? new Date(filters.dateFrom) : new Date('1970-01-01');
    const to = filters.dateTo ? new Date(filters.dateTo) : new Date('9999-12-31');
    where.push({ date: { [Op.between]: [from, to] } });
  }

  return where.length ? { [Op.and]: where } : {};
}

export async function querySales({ q, filters = {}, sortBy = 'date', sortDir = 'desc', page = 1, pageSize = 10 }) {
  const where = buildWhere({ q, filters });

  const order = sortBy === 'customerName'
    ? [[Sequelize.fn('lower', Sequelize.col('customerName')), sortDir.toUpperCase()]]
    : [[sortBy, sortDir.toUpperCase()]];

  const offset = (Math.max(Number(page), 1) - 1) * pageSize;

  const { count, rows } = await Sale.findAndCountAll({
    where,
    order,
    offset,
    limit: Number(pageSize)
  });

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return {
    meta: { total: count, page: Number(page), pageSize: Number(pageSize), totalPages },
    data: rows
  };
}
