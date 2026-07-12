/**
 * Search utility functions for filtering properties.
 * All functions are pure functions for easy unit testing.
 */

/**
 * Convert month name to month number (0-indexed)
 */
export function monthToNumber(monthName) {
  const months = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11,
  };
  return months[monthName] ?? 0;
}

/**
 * Convert property added object to a JS Date
 */
export function propertyAddedDate(added) {
  return new Date(added.year, monthToNumber(added.month), added.day);
}

/**
 * Filter properties by type
 */
export function filterByType(properties, type) {
  if (!type || type === 'Any') return properties;
  return properties.filter(
    (p) => p.type.toLowerCase() === type.toLowerCase()
  );
}

/**
 * Filter properties by price range
 */
export function filterByPrice(properties, minPrice, maxPrice) {
  return properties.filter((p) => {
    const aboveMin = minPrice === '' || minPrice === null || minPrice === undefined || p.price >= Number(minPrice);
    const belowMax = maxPrice === '' || maxPrice === null || maxPrice === undefined || p.price <= Number(maxPrice);
    return aboveMin && belowMax;
  });
}

/**
 * Filter properties by bedroom count
 */
export function filterByBedrooms(properties, minBedrooms, maxBedrooms) {
  return properties.filter((p) => {
    const aboveMin = minBedrooms === '' || minBedrooms === null || minBedrooms === undefined || p.bedrooms >= Number(minBedrooms);
    const belowMax = maxBedrooms === '' || maxBedrooms === null || maxBedrooms === undefined || p.bedrooms <= Number(maxBedrooms);
    return aboveMin && belowMax;
  });
}

/**
 * Filter properties by date added (after a given date, or between two dates)
 */
export function filterByDateAdded(properties, dateFrom, dateTo) {
  return properties.filter((p) => {
    const propDate = propertyAddedDate(p.added);
    const afterFrom = !dateFrom || propDate >= new Date(dateFrom);
    const beforeTo = !dateTo || propDate <= new Date(dateTo);
    return afterFrom && beforeTo;
  });
}

/**
 * Filter properties by postcode area (first part of postcode, e.g. BR1, NW1)
 */
export function filterByPostcode(properties, postcode) {
  if (!postcode || postcode.trim() === '') return properties;
    const code = postcode.trim().toUpperCase();
    return properties.filter((p) =>
        p.location.toUpperCase().includes(code)
    );
}

/**
 * Main search function - applies all criteria
 */
export function searchProperties(properties, criteria) {
  const { type, minPrice, maxPrice, minBedrooms, maxBedrooms, dateFrom, dateTo, postcode } = criteria;
  let results = [...properties];
  results = filterByType(results, type);
  results = filterByPrice(results, minPrice, maxPrice);
  results = filterByBedrooms(results, minBedrooms, maxBedrooms);
  results = filterByDateAdded(results, dateFrom, dateTo);
  results = filterByPostcode(results, postcode);
  return results;
}

/**
 * Format price as GBP currency string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get correct image URL considering Vite base path
 */
export function getImageUrl(path) {
  if (!path) return '';
  const base = import.meta.env.BASE_URL || '/';
  // If base ends with / and path starts with /, avoid double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}