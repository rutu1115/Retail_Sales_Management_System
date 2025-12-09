import { querySales } from '../services/salesService.js';

/**
 * Converts comma-separated query string into an array of trimmed, non-empty values
 * and normalizes them to lowercase for consistent filtering
 */
function parseCSVParam(value) {
  if (!value) return undefined;
  return value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.toLowerCase()); // normalize to lowercase
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

    // Build filter object
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

    // Call service
    const result = await querySales({
      q,
      filters,
      sortBy,
      sortDir,
      page: Number(page),
      pageSize: Number(pageSize)
    });

    res.json(result);
  } catch (err) {
    console.error('getSales failed', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
