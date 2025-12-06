import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function getSales(params) {
  // filter out undefined
  const clean = {};
  Object.keys(params || {}).forEach(k => {
    if (params[k] !== undefined && params[k] !== null && params[k] !== '') {
      clean[k] = params[k];
    }
  });
  const res = await axios.get(`${BASE}/api/sales`, { params: clean });
  return res.data;
}

export default { getSales };
