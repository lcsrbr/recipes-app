import React from 'react';
import { configureStore } from '@reduxjs/toolkit'
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import searchFoodApi from '../../redux/reducer/searchFoodApi';
import searchCocktailApi from '../../redux/reducer/searchCocktailApi'
import user from '../../redux/reducer/user';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withRedux(component, store) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

export function renderWithRouter(
  component,
  {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRedux(component, options = {}) {
  const {
    preloadedState = {},
    store = configureStore({ reducer: { searchFoodApi, searchCocktailApi, user }, preloadedState }),
    ...renderOptions
      
  } = {};

  return {
    ...render(withRedux(component, store)),
    store,
  };
}

export function renderWithRouterAndRedux(component, options = {}) {
  const {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = options;

  return {
    ...renderWithRedux(withRouter(component, history), options),
    history,
  };
}
