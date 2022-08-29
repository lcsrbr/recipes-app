import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { expect } from '@jest/globals';
import App from '../App';
import store from '../redux/store';

describe('teste do header', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa /drinks', async () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const name = screen.getByTestId('name-search-radio');
    const inpuText = screen.getByTestId('search-input');
    const search = screen.getByTestId('exec-search-btn');

    userEvent.click(name);

    userEvent.type(inpuText, 'bloody');
    userEvent.click(search);

    const corba = await screen.findByAltText(/corba/i);
    userEvent.click(corba);

    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const favorite = await screen.findByTestId('favorite-btn');
    const favImg = await screen.findByAltText('fav');
    expect(favImg).toHaveAttribute('src',
      'whiteHeartIcon.svg');
    userEvent.click(favorite);
    console.log(localStorage.favoriteRecipes);
    const firstLs = '[{"id":"52977","type":"food","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"}]';
    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(localStorage.favoriteRecipes).toBe(firstLs);
    userEvent.click(favorite);
    expect(localStorage.favoriteRecipes).toBe('[]');
  });
});
