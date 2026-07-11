/**
 * Jest tests for searchUtils.js — covering all key search functions.
 */

import {
  filterByType,
  filterByPrice,
  filterByBedrooms,
  filterByDateAdded,
  filterByPostcode,
  searchProperties,
  formatPrice,
  propertyAddedDate,
} from '../utils/searchUtils.js';

const sampleProperties = [
  { id: 'prop1', type: 'House', bedrooms: 3, price: 750000, location: 'Petts Wood Road BR5', added: { month: 'October', day: 12, year: 2022 } },
  { id: 'prop2', type: 'Flat', bedrooms: 2, price: 399995, location: 'Crofton Road BR6', added: { month: 'September', day: 14, year: 2022 } },
  { id: 'prop3', type: 'House', bedrooms: 5, price: 1250000, location: 'College Road BR1', added: { month: 'March', day: 5, year: 2023 } },
  { id: 'prop4', type: 'Flat', bedrooms: 1, price: 225000, location: 'Portland Road SE25', added: { month: 'January', day: 20, year: 2023 } },
  { id: 'prop5', type: 'House', bedrooms: 4, price: 895000, location: 'Leigham Court Road SW16', added: { month: 'June', day: 18, year: 2023 } },
];

// ---- Test 1: filterByType ----
describe('filterByType', () => {
  test('returns all properties when type is "Any"', () => {
    expect(filterByType(sampleProperties, 'Any')).toHaveLength(5);
  });
  test('filters to only Houses', () => {
    const r = filterByType(sampleProperties, 'House');
    expect(r).toHaveLength(3);
    r.forEach(p => expect(p.type).toBe('House'));
  });
  test('filters to only Flats', () => {
    expect(filterByType(sampleProperties, 'Flat')).toHaveLength(2);
  });
  test('is case-insensitive', () => {
    expect(filterByType(sampleProperties, 'house')).toHaveLength(3);
  });
  test('returns all when type is null', () => {
    expect(filterByType(sampleProperties, null)).toHaveLength(5);
  });
});

// ---- Test 2: filterByPrice ----
describe('filterByPrice', () => {
  test('returns all with no min/max', () => {
    expect(filterByPrice(sampleProperties, '', '')).toHaveLength(5);
  });
  test('filters by minimum price', () => {
    const r = filterByPrice(sampleProperties, 750000, '');
    expect(r).toHaveLength(3);
    r.forEach(p => expect(p.price).toBeGreaterThanOrEqual(750000));
  });
  test('filters by maximum price', () => {
    const r = filterByPrice(sampleProperties, '', 400000);
    expect(r).toHaveLength(2);
  });
  test('filters by price range', () => {
    const r = filterByPrice(sampleProperties, 400000, 900000);
    expect(r).toHaveLength(2);
  });
  test('returns empty when range too high', () => {
    expect(filterByPrice(sampleProperties, 2000000, 5000000)).toHaveLength(0);
  });
});

// ---- Test 3: filterByBedrooms ----
describe('filterByBedrooms', () => {
  test('returns all with no criteria', () => {
    expect(filterByBedrooms(sampleProperties, '', '')).toHaveLength(5);
  });
  test('filters by minimum bedrooms', () => {
    const r = filterByBedrooms(sampleProperties, 4, '');
    expect(r).toHaveLength(2);
  });
  test('filters for exactly 3 bedrooms', () => {
    const r = filterByBedrooms(sampleProperties, 3, 3);
    expect(r).toHaveLength(1);
    expect(r[0].bedrooms).toBe(3);
  });
  test('filters by maximum bedrooms', () => {
    const r = filterByBedrooms(sampleProperties, '', 2);
    expect(r).toHaveLength(2);
  });
});

// ---- Test 4: filterByPostcode ----
describe('filterByPostcode', () => {
  test('returns all with empty postcode', () => {
    expect(filterByPostcode(sampleProperties, '')).toHaveLength(5);
  });
  test('filters by BR1', () => {
    const r = filterByPostcode(sampleProperties, 'BR1');
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe('prop3');
  });
  test('is case-insensitive', () => {
    expect(filterByPostcode(sampleProperties, 'br1')).toHaveLength(1);
  });
  test('returns empty when postcode not found', () => {
    expect(filterByPostcode(sampleProperties, 'EC1')).toHaveLength(0);
  });
  test('filters by BR5', () => {
    expect(filterByPostcode(sampleProperties, 'BR5')).toHaveLength(1);
  });
});

// ---- Test 5: filterByDateAdded ----
describe('filterByDateAdded', () => {
  test('returns all with no dates', () => {
    expect(filterByDateAdded(sampleProperties, null, null)).toHaveLength(5);
  });
  test('filters after a date — 2023 additions', () => {
    const r = filterByDateAdded(sampleProperties, '2023-01-01', null);
    expect(r).toHaveLength(3);
    r.forEach(p => expect(p.added.year).toBeGreaterThanOrEqual(2023));
  });
  test('filters before a date — 2022 only', () => {
    const r = filterByDateAdded(sampleProperties, null, '2022-12-31');
    expect(r).toHaveLength(2);
  });
  test('filters between two dates', () => {
    const r = filterByDateAdded(sampleProperties, '2023-01-01', '2023-03-31');
    expect(r).toHaveLength(2);
  });
});

// ---- Test 6: searchProperties (combined) ----
describe('searchProperties', () => {
  test('returns all with empty criteria', () => {
    expect(searchProperties(sampleProperties, {})).toHaveLength(5);
  });
  test('combines type and minimum price', () => {
    const r = searchProperties(sampleProperties, { type: 'House', minPrice: 700000 });
    expect(r).toHaveLength(3);
    r.forEach(p => { expect(p.type).toBe('House'); expect(p.price).toBeGreaterThanOrEqual(700000); });
  });
  test('combines flat + bedrooms + price', () => {
    const r = searchProperties(sampleProperties, { type: 'Flat', minBedrooms: 2, maxPrice: 500000 });
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe('prop2');
  });
  test('returns empty when no matches', () => {
    expect(searchProperties(sampleProperties, { type: 'House', minPrice: 5000000 })).toHaveLength(0);
  });
  test('postcode + type combination', () => {
    const r = searchProperties(sampleProperties, { type: 'Flat', postcode: 'BR6' });
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe('prop2');
  });
});

// ---- Test 7: formatPrice ----
describe('formatPrice', () => {
  test('formats standard price', () => {
    expect(formatPrice(250000)).toBe('£250,000');
  });
  test('formats one million', () => {
    expect(formatPrice(1000000)).toBe('£1,000,000');
  });
  test('formats non-round number without decimals', () => {
    expect(formatPrice(399995)).toBe('£399,995');
  });
});

// ---- Test 8: propertyAddedDate ----
describe('propertyAddedDate', () => {
  test('converts October 2022 correctly', () => {
    const d = propertyAddedDate({ month: 'October', day: 12, year: 2022 });
    expect(d.getFullYear()).toBe(2022);
    expect(d.getMonth()).toBe(9);
    expect(d.getDate()).toBe(12);
  });
  test('handles January (month index 0)', () => {
    const d = propertyAddedDate({ month: 'January', day: 1, year: 2023 });
    expect(d.getMonth()).toBe(0);
  });
});
