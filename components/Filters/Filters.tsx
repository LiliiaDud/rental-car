'use client';
import { useCarsStore } from '@/lib/store/carsStore';
import css from './Filters.module.css';

interface FiltersProps {
  brands: string[];
  onSearch: () => void;
}

const prices = ['30', '40', '50', '60', '70', '80'];

function Filters({ brands, onSearch }: FiltersProps) {
  const { filters, setFilter } = useCarsStore();

  const handleMileageChange = (name: 'minMileage' | 'maxMileage', value: string) => {
    const normalizedValue = value.replace(/[^\d]/g, '');
    setFilter(name, normalizedValue);
  };

  return (
    <form
      className={css.form}
      onSubmit={e => {
        e.preventDefault();
        onSearch();
      }}
    >
      <div className={css.field}>
        <label className={css.label} htmlFor="brand">
          Car brand
        </label>
        <select
          id="brand"
          className={css.select}
          value={filters.brand}
          onChange={e => setFilter('brand', e.target.value)}
        >
          <option value="">Choose a brand</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="price">
          Price/ 1 hour
        </label>
        <select
          id="price"
          className={css.select}
          value={filters.rentalPrice}
          onChange={e => setFilter('rentalPrice', e.target.value)}
        >
          <option value="">Choose a price</option>
          {prices.map(price => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageWrap}>
          <input
            className={css.input}
            type="text"
            placeholder="From"
            value={filters.minMileage}
            onChange={e => handleMileageChange('minMileage', e.target.value)}
          />
          <input
            className={css.input}
            type="text"
            placeholder="To"
            value={filters.maxMileage}
            onChange={e => handleMileageChange('maxMileage', e.target.value)}
          />
        </div>
      </div>

      <button className={css.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
}

export default Filters;
