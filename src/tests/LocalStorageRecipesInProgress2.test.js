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

  it('testa /drinks', async () => {
    localStorage.clear();
    const history = createMemoryHistory();
    history.push('/drinks/17222/in-progress');
    const localSt = '[{"id":"/drinks/17222/in-progress","ings":["Gin"],"arrayOfCheck":["false","false","false","false"]}]'
    const localSt2 = '[{"id":"/drinks/17222/in-progress","ings":["Gin","Grand Marnier"],"arrayOfCheck":["false","false","false","false"]}]'
    localStorage.setItem('in-progress', localSt);

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

    const ingStep2 = await screen.findByRole('checkbox', {
      name: /grand marnier 1 shot/i
    })
    expect(recipeTitle).toBeInTheDocument();
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

  it('testa /drinks', async () => {
    localStorage.clear();
    const history = createMemoryHistory();
    const localSt2 = '[{"id":"/drinks/17222/in-progress","ings":["Gin","Grand Marnier"],"arrayOfCheck":["false","false","false","false"]}]'
    localStorage.setItem('in-progress', localSt2);

    history.push('/drinks/17223/in-progress');
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

    const ingStep3 = await screen.findByRole('checkbox', {
      name: /gin 2 shots/i
    })
    const ingStep4 = await screen.findByRole('checkbox', {
      name: /sweet vermouth 1 shot/i
    })
    userEvent.click(ingStep3);
    userEvent.click(ingStep4);
    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(ingStep3).toBeInTheDocument();
    expect(ingStep4).toBeInTheDocument();
    const localSt3 = '[{"id":"/drinks/17222/in-progress","ings":["Gin","Grand Marnier"],"arrayOfCheck":["false","false","false","false"]},{"id":"/drinks/17223/in-progress","ings":["Gin","Sweet Vermouth"],"arrayOfCheck":["false","false","false","false"]}]'
    expect(recipePhoto).toBeInTheDocument();
    await waitFor(() => {
      expect(localStorage.getItem('in-progress')).toEqual(localSt3)
    }, { timeout: 3000 });
  });
});
