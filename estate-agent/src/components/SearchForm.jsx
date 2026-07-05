import React, { useState } from 'react';
import { DropdownList, NumberPicker, DatePicker } from 'react-widgets';
import 'react-widgets/styles.css';

const PROPERTY_TYPES = ['Any', 'House', 'Flat'];

const PRICE_OPTIONS = [
  { label: 'No min', value: '' },
  { label: 'LKR100,000', value: 100000 },
  { label: 'LKR200,000', value: 200000 },
  { label: 'LKR300,000', value: 300000 },
  { label: 'LKR400,000', value: 400000 },
  { label: 'LKR500,000', value: 500000 },
  { label: 'LKR750,000', value: 750000 },
  { label: 'LKR1,000,000', value: 1000000 },
];

const MAX_PRICE_OPTIONS = [
  { label: 'No max', value: '' },
  { label: 'LKR200,000', value: 200000 },
  { label: 'LKR400,000', value: 400000 },
  { label: 'LKR600,000', value: 600000 },
  { label: 'LKR800,000', value: 800000 },
  { label: 'LKR1,000,000', value: 1000000 },
  { label: 'LKR1,500,000', value: 1500000 },
  { label: 'LKR2,000,000', value: 2000000 },
];

/**
 * SearchForm — uses React Widgets for all form elements.
 * @param {{ onSearch: Function }} props
 */
export default function SearchForm({ onSearch }) {
  const [type, setType] = useState('Any');
  const [minPrice, setMinPrice] = useState(PRICE_OPTIONS[0]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE_OPTIONS[0]);
  const [minBedrooms, setMinBedrooms] = useState(null);
  const [maxBedrooms, setMaxBedrooms] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [postcode, setPostcode] = useState('');

  const handleSearch = () => {
    onSearch({
      type,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      minBedrooms,
      maxBedrooms,
      dateFrom: dateFrom ? dateFrom.toISOString() : null,
      dateTo: dateTo ? dateTo.toISOString() : null,
      postcode,
    });
  };

  const handleReset = () => {
    setType('Any');
    setMinPrice(PRICE_OPTIONS[0]);
    setMaxPrice(MAX_PRICE_OPTIONS[0]);
    setMinBedrooms(null);
    setMaxBedrooms(null);
    setDateFrom(null);
    setDateTo(null);
    setPostcode('');
    onSearch({});
  };

  return (
    <div className="search-panel">
      <div className="search-panel-row">
        {/* Property Type */}
        <div className="form-group">
          <label className="form-label">Property Type</label>
          <DropdownList
            data={PROPERTY_TYPES}
            value={type}
            onChange={setType}
            containerClassName="rw-widget"
          />
        </div>

        {/* Price Range */}
        <div className="form-group">
          <label className="form-label">Price Range</label>
          <div className="form-row">
            <DropdownList
              data={PRICE_OPTIONS}
              value={minPrice}
              onChange={setMinPrice}
              dataKey="value"
              textField="label"
              placeholder="Min price"
            />
            <DropdownList
              data={MAX_PRICE_OPTIONS}
              value={maxPrice}
              onChange={setMaxPrice}
              dataKey="value"
              textField="label"
              placeholder="Max price"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="form-group">
          <label className="form-label">Bedrooms</label>
          <div className="form-row">
            <NumberPicker
              min={0} max={10}
              value={minBedrooms}
              onChange={setMinBedrooms}
              placeholder="Min beds"
            />
            <NumberPicker
              min={0} max={10}
              value={maxBedrooms}
              onChange={setMaxBedrooms}
              placeholder="Max beds"
            />
          </div>
        </div>

        {/* Date Added */}
        <div className="form-group">
          <label className="form-label">Date Added (from)</label>
          <DatePicker
            value={dateFrom}
            onChange={setDateFrom}
            placeholder="From date"
            max={dateTo || undefined}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date Added (to)</label>
          <DatePicker
            value={dateTo}
            onChange={setDateTo}
            placeholder="To date"
            min={dateFrom || undefined}
          />
        </div>
      </div>

      <div className="search-panel-row">
        {/* Postcode */}
        <div className="form-group">
          <label className="form-label">Postcode Area</label>
          <input
            type="text"
            className="rw-input"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            placeholder="e.g. 00300, 10280, 80500"
            style={{
              width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
            }}
            maxLength={6}
          />
        </div>

        <div className="search-btn-row">
          <button className="btn btn-primary" onClick={handleSearch}>
             Search
          </button>
          <button className="btn btn-outline" onClick={handleReset}>
             Reset
          </button>
        </div>
      </div>
    </div>
  );
}
