import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { expect } from '@jest/globals';
import App from '../App';
import store from '../redux/store';

const objLocalStorage = [
  {
    "id": "52771",
    "type": "food",
    "nationality": "Italian",
    "category": "Vegetarian",
    "alcoholicOrNot": "",
    "name": "Spicy Arrabiata Penne",
    "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    "doneDate": "23/06/2020",
    "tags": [
      "Pasta",
      "Curry"
    ]
  },
  {
    "id": "178319",
    "type": "drink",
    "nationality": "",
    "category": "Cocktail",
    "alcoholicOrNot": "Alcoholic",
    "name": "Aquamarine",
    "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
    "doneDate": "23/06/2020",
    "tags": []
  }
]

describe('Tests the done Recipes page', () => {
  afterEach(() => jest.clearAllMocks());

  Object.assign(navigator, {
    clipboard: {
      writeText: () => { },
    },
  });

  it('Test screen elements', () => {
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const title = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(title).toBeDefined();
    expect(profileBtn).toBeDefined();
    expect(allBtn).toBeDefined();
    expect(foodBtn).toBeDefined();
    expect(drinkBtn).toBeDefined()
  });

  it('Forehead renders done Recipes', () => {
    localStorage.clear()
    localStorage.setItem('doneRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const image = screen.getAllByTestId(/horizontal-image/i);
    const top_text = screen.getAllByTestId(/horizontal-top-text/i);
    const name = screen.getAllByTestId(/horizontal-name/i);
    const share = screen.getAllByTestId(/horizontal-share-btn/i);
    const favorite = screen.getAllByTestId(/horizontal-favorite-btn/i);

    expect(image).toHaveLength(2);
    expect(top_text).toHaveLength(2);
    expect(name).toHaveLength(2);
    expect(share).toHaveLength(2);
    expect(favorite).toHaveLength(2);
  });

  it('check filters', async () => {
    localStorage.clear()
    localStorage.setItem('doneRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(foodBtn);
    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(1);

    userEvent.click(allBtn);
    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(2);

    userEvent.click(drinkBtn);
    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(1)
  });
  it('test redirection food', () => {
    localStorage.clear()
    localStorage.setItem('doneRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const image = screen.getByTestId(/0-horizontal-image/i);
    userEvent.click(image);
    expect(history.location.pathname).toBe('/foods/52771');

  })

  it('test redirection drink', () => {
    localStorage.clear()
    localStorage.setItem('doneRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const name = screen.getByTestId(/1-horizontal-name/i);
    userEvent.click(name);
    expect(history.location.pathname).toBe('/drinks/178319');
  })

  it('Test remove done Recipes', async () => {
    localStorage.clear()
    localStorage.setItem('doneRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const favorite = screen.getByTestId(/0-horizontal-favorite-btn/i);
    userEvent.click(favorite);

    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(1)

  })
  it('test sharing food', async () => {
    localStorage.clear()
    localStorage.setItem('doneRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const share = screen.getByTestId(/0-horizontal-share-btn/i);
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(share);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  })
  it('test sharing food', async () => {
    localStorage.clear()
    localStorage.setItem('doneRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const share = screen.getByTestId(/1-horizontal-share-btn/i);
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(share);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  });
});