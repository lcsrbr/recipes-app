import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFoodApi } from '../redux/reducer/searchFoodApi';
import foodApi from '../services/foodApi';

function SearchBar() {
  const [searchFilter, setSearchFilter] = useState('Ingredient');
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  const getSearchFoodApi = () => {
    if (searchFilter === 'First-letter' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    foodApi(searchFilter, searchInput)
      .then((item) => dispatch(saveFoodApi(item)));
  };

  return (
    <>
      <div>SearchBar</div>
      <label htmlFor="Ingredient">
        Ingredient
        <input
          type="radio"
          id="Ingredient"
          name="radioSearch"
          data-testid="ingredient-search-radio"
          onClick={ () => setSearchFilter('Ingredient') }
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          type="radio"
          id="Name"
          name="radioSearch"
          data-testid="name-search-radio"
          onClick={ () => setSearchFilter('Name') }

        />
      </label>

      <label htmlFor="First letter">
        First letter
        <input
          type="radio"
          id="First letter"
          name="radioSearch"
          data-testid="first-letter-search-radio"
          onClick={ () => setSearchFilter('First-letter') }

        />
      </label>
      <input
        type="text"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ getSearchFoodApi }
      >
        buscar
      </button>
    </>
  );
}

export default SearchBar;
