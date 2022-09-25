import React, { useState } from 'react';

function Search() {
  const [inputSearch, setIpuntSearch] = useState('');

  return (
    <div>
      <label htmlFor="search">
        <input
          data-testid="search-input"
          type="text"
          name="search"
          value={ inputSearch }
          onChange={ ({ target: { value } }) => setIpuntSearch(value) }
        />
      </label>
    </div>
  );
}

export default Search;
