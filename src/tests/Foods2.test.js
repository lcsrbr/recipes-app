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

describe('teste do foods', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa /foods (clique na categoria)', async () => {
    const history = createMemoryHistory();
    history.push('/foods');

    const { debug } = render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const cardName0 = await screen.findByText(/corba/i);
    expect(cardName0).toBeInTheDocument();

    const inpuText = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(inpuText);
    const cardName1 = await screen.findByText(/breakfast potatoes/i);
    expect(cardName1).toBeInTheDocument();

    const inpuText1 = await screen.findByTestId('Goat-category-filter');
    userEvent.click(inpuText1);
    const cardName2 = await screen.findByText(/goat/i);
    expect(cardName2).toBeInTheDocument();
    debug();
    const inpuText2 = await screen.findByTestId('All-category-filter');
    userEvent.click(inpuText2);
    // userEvent.click(inpuText2);

    // expect(cardName0).toBeInTheDocument();
  });
  it('testa /foods (clique na categoria)', async () => {
    const history = createMemoryHistory();
    history.push('/foods');

    const { debug } = render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const inpuText1 = await screen.findByTestId('Goat-category-filter');
    userEvent.click(inpuText1);
    const cardName2 = await screen.findByText(/goat/i);
    expect(cardName2).toBeInTheDocument();
    const inpuText2 = await screen.findByTestId('All-category-filter');
    userEvent.click(inpuText2);
    // userEvent.click(inpuText2);

    // expect(cardName0).toBeInTheDocument();
  });
});
