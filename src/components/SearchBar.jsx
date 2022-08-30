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
    return history.location.pathname === '/foods' ? foodApi(searchFilter, searchInput)
      .then((item) => dispatch(saveFoodApi(item)))
      : cocktailApi(searchFilter, searchInput)
        .then((item) => dispatch(saveCocktailApi(item)));
    // getApiCocktail(window.location.pathname);
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
      <div className="searchBar">
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

      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ getSearchFoodApi }
        className="animate-bounce
        inline-block
        w-30 mt-10
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
  );
}

export default SearchBar;
