import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function Header() {
  const [toogle, setToogle] = useState(false);

  const history = useHistory();
  const dynamicTitle = () => ({
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  }[history.location.pathname]);

  const dynamicSearchIcon = () => ({
    '/foods': false,
    '/drinks': false,
    '/profile': true,
    '/done-recipes': true,
    '/favorite-recipes': true,
  }[history.location.pathname]);

  const clickSearch = () => {
    setToogle(!toogle);
  };

  return (
    <header className="shadow-lg shadow-grey-500/20">
      <div className="iconsAndTitle">
        <Link to="/profile" className='bg-white'>
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
            className='bg-white'
          />
        </Link>
        <h1 data-testid="page-title" className="text-3xl font-light bg-white">
          {dynamicTitle()}
        </h1>
        {!dynamicSearchIcon() && (
          <button type="button" onClick={ () => setToogle((prev) => !prev) }>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
              className='bg-white'
            />
          </button>
        )}
      </div>
      {toogle && <SearchBar clickSearch={ clickSearch } />}
    </header>
  );
}

export default Header;
