import React from "react";
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from "../App";
import store from '../redux/store'
import { Provider } from 'react-redux';


describe('teste do Footer', () => {
  it('testa de aparece icones', async () => {
    const history = createMemoryHistory()
    history.push('/foods')
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>,
      </Provider>
    )
    const foods = screen.getByTestId('food-bottom-btn');
    const foodsIcon = screen.getByRole('img', { name: /foods/i })
    const cocktail = screen.getByTestId('drinks-bottom-btn');
    const coktailIcon = screen.getByRole('img', { name: /drink/i })

    expect(foods).toBeDefined();
    expect(foodsIcon).toBeDefined();
    expect(cocktail).toBeDefined();
    expect(coktailIcon).toBeDefined();

    
    userEvent.click(foods)
    expect(history.location.pathname).toBe('/foods')

    userEvent.click(cocktail)
    expect(history.location.pathname).toBe('/drinks');
  })
})