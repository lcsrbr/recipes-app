import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { expect } from '@jest/globals';
import { within } from '@testing-library/dom';
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
    const start = await screen.findByTestId('start-recipe-btn');
    expect(start).toBeInTheDocument();

    userEvent.click(start);

    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const nameAndMeasure = await screen.findAllByTestId(/ingredient-step/i);
    const instructions = await screen.findByTestId('instructions');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(nameAndMeasure).toHaveLength(13);
    expect(instructions).toBeInTheDocument();
  });
  localStorage.clear();

  it('testa /drinks', async () => {
    const history = createMemoryHistory();
    history.push('/drinks/15997/in-progress');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const ingr0 = await screen.findByTestId('0-ingredient-step');
    const ingr1 = await screen.findByTestId('1-ingredient-step');
    const ingr2 = await screen.findByTestId('2-ingredient-step');
    userEvent.click(ingr0);
    userEvent.click(ingr1);
    userEvent.click(ingr2);
    const finish = await screen.findByTestId('finish-recipe-btn');

    expect(finish).toBeEnabled();
    userEvent.click(finish);
    expect(history.location.pathname).toBe('/done-recipes');
    const image = await screen.findByTestId('0-horizontal-image');
    expect(image).toBeInTheDocument();
  });
  localStorage.clear();

  it('testa /drinks', async () => {
    localStorage.clear();

    const storage = '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"xx/xx/xx","tags":[null]}]';
    localStorage.getItem('doneRecipes', storage);
    const history = createMemoryHistory();
    history.push('/drinks/15997/in-progress');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const ingr0 = await screen.findByTestId('0-ingredient-step');
    const ingr1 = await screen.findByTestId('1-ingredient-step');
    const ingr2 = await screen.findByTestId('2-ingredient-step');
    userEvent.click(ingr0);
    userEvent.click(ingr1);
    userEvent.click(ingr2);
    const finish = await screen.findByTestId('finish-recipe-btn');

    expect(finish).toBeEnabled();
    userEvent.click(finish);
    expect(history.location.pathname).toBe('/done-recipes');
    const image = await screen.findByTestId('0-horizontal-image');
    expect(image).toBeInTheDocument();
  });
  localStorage.clear();

  it('testa /drinks', async () => {
    const storage = '[{"id":"13501","type":"drink","nationality":"","category":"Shot","alcoholicOrNot":"Alcoholic","name":"ABC","image":"https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg","doneDate":"xx/xx/xx","tags":[null]}]';
    localStorage.setItem('doneRecipes', storage);
    const history = createMemoryHistory();
    history.push('/drinks/15997/in-progress');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const ingr0 = await screen.findByTestId('0-ingredient-step');
    const ingr1 = await screen.findByTestId('1-ingredient-step');
    const ingr2 = await screen.findByTestId('2-ingredient-step');
    userEvent.click(ingr0);
    userEvent.click(ingr1);
    userEvent.click(ingr2);
    const finish = await screen.findByTestId('finish-recipe-btn');

    expect(finish).toBeEnabled();
    userEvent.click(finish);
    expect(history.location.pathname).toBe('/done-recipes');
    const image = await screen.findByTestId('0-horizontal-image');
    expect(image).toBeInTheDocument();
    expect(image).toBeInTheDocument();

    const image2 = await screen.findByTestId('1-horizontal-image');
    expect(image2).toBeInTheDocument();
  });
});
