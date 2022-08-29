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

const objLocalStorage = [
  {
    "id": "52977",
    "type": "food",
    "nationality": "Turkish",
    "category": "Side",
    "alcoholicOrNot": "",
    "name": "Corba",
    "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
  },
  {
    "id": "53060",
    "type": "food",
    "nationality": "Croatian",
    "category": "Side",
    "alcoholicOrNot": "",
    "name": "Burek",
    "image": "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"
  },
  {
    "id": "17222",
    "type": "drink",
    "nationality": "",
    "category": "Cocktail",
    "alcoholicOrNot": "Alcoholic",
    "name": "A1",
    "image": "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg"
  },
  {
    "id": "15997",
    "type": "drink",
    "nationality": "",
    "category": "Ordinary Drink",
    "alcoholicOrNot": "Optional alcohol",
    "name": "GG",
    "image": "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"
  }
]

describe('Tests the Favorite Recipes page', () => {
  afterEach(() => jest.clearAllMocks());

  Object.assign(navigator, {
    clipboard: {
      writeText: () => { },
    },
  });

  it('Test screen elements', () => {
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
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

  it('Forehead renders favorites', () => {
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
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

    expect(image).toHaveLength(4);
    expect(top_text).toHaveLength(4);
    expect(name).toHaveLength(4);
    expect(share).toHaveLength(4);
    expect(favorite).toHaveLength(4);
  });

  it('check filters', async () => {
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
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
    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(2);

    userEvent.click(allBtn);
    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(4);

    userEvent.click(drinkBtn);
    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(2)
  });
  it('test redirection food', () => {
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
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
    expect(history.location.pathname).toBe('/foods/52977');

  })

  it('test redirection drink', () => {
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const name = screen.getByTestId(/2-horizontal-name/i);
    userEvent.click(name);
    expect(history.location.pathname).toBe('/drinks/17222');
  })
  
  it('Test remove favorite', async () => {
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
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

    expect(await screen.findAllByTestId(/horizontal-image/i)).toHaveLength(3)

  })
  it('test sharing food', async () => {
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
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

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  })
  it('test sharing food', async () => {
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify(objLocalStorage))
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const share = screen.getByTestId(/2-horizontal-share-btn/i);
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(share);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/17222');
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  });
  });