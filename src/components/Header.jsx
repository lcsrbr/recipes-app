import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [toogle, setToogle] = useState(false);

  const dynamicTitle = () => ({
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  })[window.location.pathname];

  const dynamicSearchIcon = () => ({
    '/foods': false,
    '/drinks': false,
    '/profile': true,
    '/done-recipes': true,
    '/favorite-recipes': true,
  })[window.location.pathname];

  return (
    <div>
      <h1 data-testid="page-title">{ dynamicTitle() }</h1>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      { !dynamicSearchIcon() && (
        <button
          type="button"
          onClick={ () => setToogle((prev) => !prev) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>

      ) }
      {toogle && <SearchBar /> }
    </div>
  );
}

export default Header;
