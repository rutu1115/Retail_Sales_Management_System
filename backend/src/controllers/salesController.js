import { querySales } from '../services/salesService.js';

function parseCSVParam(value) {
  if (!value) return undefined;
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

export async function getSales(req, res) {
  try {
    const {
      q,
      regions,
      genders,
      ageMin,
      ageMax,
      productCategories,
      tags,
      paymentMethods,
      dateFrom,
      dateTo,
      sortBy,
      sortDir,
      page = 1,
      pageSize = 10
    } = req.query;

    const filters = {
      regions: parseCSVParam(regions),
      genders: parseCSVParam(genders),
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      productCategories: parseCSVParam(productCategories),
      tags: parseCSVParam(tags),
      paymentMethods: parseCSVParam(paymentMethods),
      dateFrom,
      dateTo
    };

    const result = await querySales({ q, filters, sortBy, sortDir, page, pageSize });
    res.json(result);
  } catch (err) {
    console.error('getSales failed', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
