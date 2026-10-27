import { loadListings } from './_lib/db.js';
import { filterListings } from '../server/lib/search.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const items = await loadListings();
    const result = filterListings(items, req.query);
    return res.status(200).json({ count: result.length, listings: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not load listings.' });
  }
}
