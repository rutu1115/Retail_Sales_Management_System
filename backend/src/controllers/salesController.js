const salesService = require('../services/salesService');

async function getSales(req, res) {
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

    const result = salesService.querySales({
      data: req.salesData,
      q,
      filters,
      sortBy,
      sortDir,
      page: Number(page),
      pageSize: Number(pageSize)
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function parseCSVParam(value) {
  if (!value) return undefined;
  // Accept comma-separated or single value
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

module.exports = { getSales };
