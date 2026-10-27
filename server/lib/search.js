// Shared listing filter + sort, used by the Express server and the Vercel functions.
export const sorters = {
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (b, a) => a.price - b.price,
  'beds-asc': (a, b) => a.beds - b.beds,
  'beds-desc': (b, a) => a.beds - b.beds,
  'baths-asc': (a, b) => a.baths - b.baths,
  'baths-desc': (b, a) => a.baths - b.baths
};

export function filterListings(items, query = {}) {
  const { location = '', type = '', beds = '', baths = '', minPrice = '', maxPrice = '', sort = 'newest' } = query;
  const loc = String(location).toLowerCase();
  return items
    .filter((l) => !loc || l.location.toLowerCase().includes(loc) || l.title.toLowerCase().includes(loc))
    .filter((l) => !type || l.type === type)
    .filter((l) => beds === '' || l.beds >= Number(beds))
    .filter((l) => baths === '' || l.baths >= Number(baths))
    .filter((l) => minPrice === '' || l.price >= Number(minPrice))
    .filter((l) => maxPrice === '' || l.price <= Number(maxPrice))
    .sort(sorters[sort] || sorters.newest);
}

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
