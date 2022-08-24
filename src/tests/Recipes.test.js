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
    const nameAndMeasure = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const instructions = await screen.findByTestId('instructions');
    const recomendation = await screen.findAllByTestId(/recomendation-card/i);
    const video = await screen.findByTestId('video');
    const start = await screen.findByTestId('start-recipe-btn');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(nameAndMeasure).toHaveLength(13);
    expect(instructions).toBeInTheDocument();
    expect(recomendation).toHaveLength(6);
    expect(video).toBeInTheDocument();
    expect(start).toBeInTheDocument();

    console.log(store.getState());
  });
});
