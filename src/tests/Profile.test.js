import React from "react";
import App from '../App';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import store from '../redux/store'
import { Provider } from 'react-redux';

describe('Tests the Profile page', () => {
  it('Check page elements', () => {
    const history = createMemoryHistory()
    history.push('/')
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>,
      </Provider>
    )

    const buttonEnter = screen.getByTestId('login-submit-btn');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(buttonEnter);

    userEvent.click(screen.getByTestId('profile-top-btn'));

    const title = screen.getByTestId('page-title');
    const email = screen.getByTestId('profile-email');
    const doneRecipes = screen.getByTestId('profile-done-btn');
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');

    expect(title).toBeDefined();
    expect(email).toBeDefined();
    expect(doneRecipes).toBeDefined();
    expect(favoriteRecipes).toBeDefined();
    expect(logout).toBeDefined();

    expect(email).toHaveTextContent('Email: email@email.com');
  });

  it('Check doneRecipes button', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>,
      </Provider>

    );

    const doneRecipes = screen.getByTestId('profile-done-btn');
    expect(doneRecipes).toBeDefined();
    userEvent.click(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes')
  });

  it('Check favoriteRecipes button', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>,
      </Provider>

    );

    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipes).toBeDefined();
    userEvent.click(favoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes')
  });

  it('Check logout button', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>,
      </Provider>

    );

    const logout = screen.getByTestId('profile-logout-btn');
    expect(logout).toBeDefined();
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/')
  });
  it('empty storage location', () => {
    const history = createMemoryHistory()
    history.push('/profile')
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>,
      </Provider>
    )

    const email = screen.getByTestId('profile-email');

    expect(email).toBeDefined();

    expect(email).toHaveTextContent('Email:');
  });
})