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

  //
  //
  //
  // https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  it('clipboard', async () => {
    const history = createMemoryHistory();
    history.push('/foods/52977');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const share = await screen.findByTestId('share-btn');
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(share);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  });

  it('clipboard', async () => {
    const history = createMemoryHistory();
    history.push('/foods/52977');
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
    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    const left = await screen.findByRole('button', {
      name: /left/i,
    });
    const right = await screen.findByRole('button', {
      name: /right/i,
    });
    const start = await screen.findByTestId('start-recipe-btn');

    expect(left).toBeInTheDocument();
    expect(right).toBeInTheDocument();
    userEvent.click(left);
    userEvent.click(right);
    userEvent.click(start);
  });
  it('clipboard', async () => {
    const history = createMemoryHistory();
    history.push('/foods/52977');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const share = await screen.findByTestId('share-btn');
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(share);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  });

  it('clipboard', async () => {
    const history = createMemoryHistory();
    history.push('/foods/52977/in-progress');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );
    const share = await screen.findByTestId('share-btn');
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(share);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toHaveTextContent('Link copied!');
  });
});
