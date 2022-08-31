import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { saveFoodApi } from '../redux/reducer/searchFoodApi';
import foodApi from '../services/foodApi';
import cocktailApi from '../services/cocktailApi';
import { saveCocktailApi } from '../redux/reducer/searchCocktailApi';

function SearchBar() {
  const [searchFilter, setSearchFilter] = useState('Ingredient');
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const getSearchFoodApi = () => {
    if (searchFilter === 'First-letter' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    return history.location.pathname === '/foods'
      ? foodApi(searchFilter, searchInput)
        .then((item) => dispatch(saveFoodApi(item)))
      : cocktailApi(searchFilter, searchInput)
        .then((item) => dispatch(saveCocktailApi(item)));
  };

  return (
    <div className="searchCamp">
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        placeholder="type here"
        className="focus:animate-pulse
        apperance-none
        block w-full
        px-4 py-3
        leading-tight
         text-gray-700
          bg-gray-50
           focus:bg-white border
            border-gray-200
             focus:border-gray-500
             rounded
              focus:outline-none"
      />
      <div className="selectAndSearch">
        <select onClick={ ({ target }) => setSearchFilter(target.value) }>
          <option value="Ingredient">Ingredient</option>
          <option value="Name">Name</option>
          <option value="First-letter">First letter</option>
        </select>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ getSearchFoodApi }
          className="animate-pulse
          flex
        px-8 py-4
        leading-none
         text-white
          bg-orange-500
           hover:bg-orange-700
           transition
           duration-300
           font-semibold
           rounded
           shadow "
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
