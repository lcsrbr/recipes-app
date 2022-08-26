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

describe('teste do localStorage', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa /foods', async () => {
    const firstLs = '[{"id":"52977","type":"food","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"}]';
    const history = createMemoryHistory();
    history.push('/foods/52977/in-progress');
    // localStorage.setItem('favoriteRecipes', )
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const favImg = await screen.findByAltText('fav');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src',
      'whiteHeartIcon.svg');
    const favorite = await screen.findByTestId('favorite-btn');
    userEvent.click(favorite);

    expect(localStorage.favoriteRecipes).toBe(firstLs);
    console.log(localStorage.favoriteRecipes);
    // waitFor(() => {
    //   expect(localStorage.favoriteRecipes).toBe(firstLs);
    // }, { timeout: 5000 });

    expect(favImg).toHaveAttribute('src',
      'blackHeartIcon.svg');

    userEvent.click(favorite);
    expect(favImg).toHaveAttribute('src',
      'whiteHeartIcon.svg');
    expect(localStorage.favoriteRecipes).toBe('[]');
  });

  it('testa /drinks', async () => {
    const firstLs = '[{"id":"17222","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg"}]';
    const history = createMemoryHistory();
    history.push('/drinks/17222/in-progress');
    // localStorage.setItem('favoriteRecipes', )
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const favImg = await screen.findByAltText('fav');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src',
      'whiteHeartIcon.svg');
    const favorite = await screen.findByTestId('favorite-btn');
    userEvent.click(favorite);

    expect(localStorage.favoriteRecipes).toBe(firstLs);
    console.log(localStorage.favoriteRecipes);
    // waitFor(() => {
    //   expect(localStorage.favoriteRecipes).toBe(firstLs);
    // }, { timeout: 5000 });

    expect(favImg).toHaveAttribute('src',
      'blackHeartIcon.svg');

    userEvent.click(favorite);
    expect(favImg).toHaveAttribute('src',
      'whiteHeartIcon.svg');
    expect(localStorage.favoriteRecipes).toBe('[]');
  });

  it('testa /drinks', async () => {
    const firstLs = '[{"id":"17222","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg"}]';
    localStorage.clear();
    const history = createMemoryHistory();
    history.push('/drinks/17222/in-progress');
    localStorage.setItem('favoriteRecipes', firstLs);
    // localStorage.setItem('favoriteRecipes', )
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const favImg = await screen.findByAltText('fav');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();

    const favorite = await screen.findByTestId('favorite-btn');
    expect(localStorage.favoriteRecipes).toBe(firstLs);
    expect(favorite).toBeInTheDocument();

    expect(favImg).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    await waitFor(() => {
      expect(favImg).toHaveAttribute('src',
      'whiteHeartIcon.svg');
    }, { timeout: 1000 });

    expect(localStorage.favoriteRecipes).toBe('[]');
  });

  it('testa /drinks', async () => {
    localStorage.clear();
    const history = createMemoryHistory();
    history.push('/drinks/17222/in-progress');
    const localSt = '[{"id":"/drinks/17222/in-progress","ings":["Gin"],"arrayOfCheck":["false","false","false","false"]}]'
    const localSt2 = '[{"id":"/drinks/17222/in-progress","ings":["Gin","Grand Marnier"],"arrayOfCheck":["false","false","false","false"]}]'
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const favImg = await screen.findByAltText('fav');
    const ingStep1 = await screen.findByRole('checkbox', {
      name: /gin 1 3\/4 shot/i
    })
    const ingStep2 = await screen.findByRole('checkbox', {
      name: /grand marnier 1 shot/i
    })
    expect(recipeTitle).toBeInTheDocument();
    userEvent.click(ingStep1);

    await waitFor(() => {
      expect(localStorage.getItem('in-progress')).toEqual(localSt)
    }, { timeout: 1000 });
    userEvent.click(ingStep2);
    expect(recipePhoto).toBeInTheDocument();
    await waitFor(() => {
      expect(localStorage.getItem('in-progress')).toEqual(localSt2)
    }, { timeout: 1000 });
    history.push('/drinks/17222/in-progress');
    await waitFor(() => {
      expect(localStorage.getItem('in-progress')).toEqual(localSt2)
    }, { timeout: 1000 });
    expect(ingStep2.checked).toEqual(true)
  });

});
