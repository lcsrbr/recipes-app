import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
          src="../images/profileIcon"
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      { !dynamicSearchIcon() && (
        <img
          src="../images/searchIcon"
          alt="search icon"
          data-testid="search-top-btn"
        />
      ) }
    </div>
  );
}

export default Header;
