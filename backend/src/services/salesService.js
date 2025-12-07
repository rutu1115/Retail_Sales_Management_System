const _ = require('lodash');

/**
 * querySales - perform search, filtering, sorting and pagination
 * @param {Object} options
 *   - data: array of records
 *   - q: search string (applies to customer name and phone)
 *   - filters: object containing filter arrays / ranges
 *   - sortBy: field name ('date', 'quantity', 'customerName')
 *   - sortDir: 'asc' or 'desc'
 *   - page, pageSize
 */
function querySales(options) {
  const {
    data = [],
    q,
    filters = {},
    sortBy,
    sortDir = 'desc',
    page = 1,
    pageSize = 10
  } = options;

  let items = [...data];

  // 1) Search - case-insensitive across Customer Name and Phone Number
  // ---- SEARCH LOGIC ----
  if (q && q.trim() !== '') {
    const qLower = q.trim().toLowerCase();

    items = items.filter(item => {
      const cname = (item.customerName || '').toLowerCase().trim();
      const phone = (item.phoneNumber || item['Phone Number'] || '').toLowerCase();

      const nameWords = cname.split(/\s+/);

      const exactNameMatch = nameWords.includes(qLower);
      const exactPhoneMatch = phone === qLower;
      const wordStartsWithMatch = nameWords.some(w => w.startsWith(qLower));
      const fullNameStartsWithMatch = cname.startsWith(qLower);
      

      return exactNameMatch || exactPhoneMatch || wordStartsWithMatch || fullNameStartsWithMatch ;
    });
  }


  // 2) Filters
  // Regions (Customer Region)
  if (filters.regions && filters.regions.length > 0) {
    const set = new Set(filters.regions.map(x => x.toLowerCase()));
    items = items.filter(it => (it.customerRegion || '').toString().toLowerCase() && set.has((it.customerRegion || '').toString().toLowerCase()));
  }

  // Gender
  if (filters.genders && filters.genders.length > 0) {
    const set = new Set(filters.genders.map(x => x.toLowerCase()));
    items = items.filter(it => set.has(((it.gender || '')).toString().toLowerCase()));
  }

  // Age Range
  if (typeof filters.ageMin !== 'undefined' || typeof filters.ageMax !== 'undefined') {
    items = items.filter(it => {
      const age = Number(it.age) || null;
      if (age === null) return false;
      if (typeof filters.ageMin !== 'undefined' && age < filters.ageMin) return false;
      if (typeof filters.ageMax !== 'undefined' && age > filters.ageMax) return false;
      return true;
    });
  }

  // Product Category
  if (filters.productCategories && filters.productCategories.length > 0) {
    const set = new Set(filters.productCategories.map(x => x.toLowerCase()));
    items = items.filter(it => set.has(((it.productCategory || '')).toString().toLowerCase()));
  }

  // Tags (CSV in Tags column) -> support multi-select, match any selected tag
  if (filters.tags && filters.tags.length > 0) {
    const selected = filters.tags.map(t => t.toLowerCase());
    items = items.filter(it => {
      const tagsStr = (it.tags || '').toString().toLowerCase();
      if (!tagsStr) return false;
      const rowTags = tagsStr.split(',').map(s => s.trim());
      return selected.some(s => rowTags.includes(s));
    });
  }

  // Payment Methods
  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    const set = new Set(filters.paymentMethods.map(x => x.toLowerCase()));
    items = items.filter(it => set.has(((it.paymentMethod || '')).toString().toLowerCase()));
  }

  // Date Range filtering (assumes 'date' field is present and in an ISO-parsable format)
  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const to = filters.dateTo ? new Date(filters.dateTo) : null;
    items = items.filter(it => {
      if (!it.date) return false;
      const d = new Date(it.date);
      if (isNaN(d.getTime())) return false;
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }

  // 3) Sorting
  // Supported: date (newest first), quantity, customer name (A-Z)
  if (sortBy) {
    const dir = (sortDir && sortDir.toLowerCase() === 'asc') ? 'asc' : 'desc';
    if (sortBy === 'date') {
      items = _.orderBy(items, [it => new Date(it.date).getTime() || 0], [dir]);
    } else if (sortBy === 'quantity') {
      items = _.orderBy(items, [it => Number(it.quantity) || 0], [dir]);
    } else if (sortBy === 'customerName') {
      items = _.orderBy(items, [it => (it.customerName || '').toString().toLowerCase()], [dir]);
    } else {
      // generic fallback
      items = _.orderBy(items, [sortBy], [dir]);
    }
  } else {
    // default sort: date desc if date exists
    items = _.orderBy(items, [it => new Date(it.date).getTime() || 0], ['desc']);
  }

  // 4) Pagination: page is 1-indexed
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const pagedItems = items.slice(start, start + pageSize);

  return {
    meta: {
      total,
      page: currentPage,
      pageSize,
      totalPages
    },
    data: pagedItems
  };
}

module.exports = { querySales };
