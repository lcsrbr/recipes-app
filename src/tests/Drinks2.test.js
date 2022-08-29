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

describe('teste do drinks', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa /drinks (clique na categoria)', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');

    const { debug } = render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const cardName0 = await screen.findByText(/GG/i);
    expect(cardName0).toBeInTheDocument();

    const inpuText = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(inpuText);
    const cardName1 = await screen.findByText(/3-Mile Long Island Iced Tea/i);
    expect(cardName1).toBeInTheDocument();
  });
  it('testa /drinks (clique na categoria)', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');

    const { debug } = render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const inpuText = await screen.findByTestId('Ordinary Drink-category-filter');
    const cardName0 = await screen.findByText(/GG/i);
    expect(cardName0).toBeInTheDocument();
    userEvent.click(inpuText);
    const inpuText2 = await screen.findByTestId('All-category-filter');
    userEvent.click(inpuText2);
    expect(cardName0).toBeInTheDocument();

    // userEvent.click(inpuText2);

    // expect(cardName0).toBeInTheDocument();
  });
});
