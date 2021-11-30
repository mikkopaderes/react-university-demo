import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSearchParams } from 'react-router-dom';

import countries from './-utils/countries';
import styles from './index.module.css';

interface SearchBarProps {
  query: string;
  country: string;
  onChange(newSearchParams: string): unknown;
}

function SearchBar({ query, country, onChange }: SearchBarProps): JSX.Element {
  let searchParams = { query, country };

  function handleChange(searchParamsData: { query: string, country: string }) {
    searchParams = searchParamsData;

    const newSearchParams = createSearchParams();

    if (searchParams.query) {
      newSearchParams.append('query', searchParams.query);
    }

    if (searchParams.country) {
      newSearchParams.append('country', searchParams.country);
    }

    onChange(newSearchParams.toString());
  }

  return (
    <div className={styles.host}>
      <div className={styles.firstBar}>
        <input
          className={styles.searchField}
          data-testid="search-field"
          type="search"
          placeholder="Search for Universities"
          value={query}
          onChange={(e) => handleChange({ ...searchParams, query: e.target.value })}
        />
      </div>

      <div className={styles.secondBar}>
        <div className={styles.countryFieldContainer}>
          <select
            className={styles.countryField}
            data-testid="country-field"
            value={country}
            onChange={(e) => handleChange({ ...searchParams, country: e.target.value })}
          >
            <option value="">Country</option>
            {countries.map((item) => <option value={item}>{item}</option>)}
          </select>

          <FontAwesomeIcon className={styles.countryFieldIcon} icon="caret-down" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
