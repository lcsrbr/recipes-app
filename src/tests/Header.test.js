import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Foods from '../pages/Foods';

// beforeEach(() => {
//   fetch.mockClear();
// });

describe('teste do header', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa /foods', async () => {
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

    userEvent.type(inpuText, 'cake');
    userEvent.click(search);

    expect(await screen.findAllByAltText(/cake/i)).toHaveLength(12);
    console.log(window.location.pathname);
    console.log(store.getState());

    // await waitFor(async () => {
    //   expect(await screen.findAllByAltText(/bloody/i)).toHaveLength(2);
    //   console.log(window.location.pathname);
    //   console.log(store.getState());
    // });
  });

  it('testa /drinks', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');
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

    expect(await screen.findAllByAltText(/bloody/i)).toHaveLength(3);
    console.log(window.location.pathname);
    console.log(store.getState());

    // await waitFor(async () => {
    //   expect(await screen.findAllByAltText(/bloody/i)).toHaveLength(2);
    //   console.log(window.location.pathname);
    //   console.log(store.getState());
    // });
  });

  it('teste', () => {
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

    const foods = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');
    const profileIco = screen.getByTestId('profile-top-btn');

    expect(foods).toBeDefined();
    expect(searchIcon).toBeDefined();
    expect(profileIco).toBeDefined();

    userEvent.click(searchIcon);

    const ingerdient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const inpuText = screen.getByTestId('search-input');
    const search = screen.getByTestId('exec-search-btn');

    expect(ingerdient).toBeDefined();
    expect(name).toBeDefined();
    expect(firstLetter).toBeDefined();
    expect(inpuText).toBeDefined();
    expect(search).toBeDefined();

    userEvent.click(firstLetter);
    expect(firstLetter).toBeChecked();
    userEvent.click(ingerdient);
    expect(ingerdient).toBeChecked();
    userEvent.click(name);
    expect(name).toBeChecked();

    userEvent.type(inpuText, 'cake');
    expect(inpuText).toHaveValue('cake');
    userEvent.click(search);
  });

  it('testa /food', async () => {
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

    const ingerdient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const inpuText = screen.getByTestId('search-input');
    const search = screen.getByTestId('exec-search-btn');

    expect(ingerdient).toBeDefined();
    expect(name).toBeDefined();
    expect(firstLetter).toBeDefined();
    expect(inpuText).toBeDefined();
    expect(search).toBeDefined();

    userEvent.click(name);

    userEvent.type(inpuText, 'cake');
    expect(inpuText).toHaveValue('cake');
    userEvent.click(search);

    waitFor(() => expect(screen.findAllByAltText(/cake/i)).toHaveLength(12));
    // expect(await screen.findAllByAltText(/cake/i)).toHaveLength(12)
  });

  it('testea alert', () => {
    global.alert = jest.fn();
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

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const inpuText = screen.getByTestId('search-input');
    const search = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(inpuText, 'texto');
    userEvent.click(search);

    const alert = 'Your search must have only 1 (one) character';
    expect(global.alert).toBeCalledWith(alert);
  });

  // global.fetch = jest.fn(() => Promise.resolve({
  //   json: () => Promise.resolve(),
  // }));

  it('testa /drinks', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');
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

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ foodApi: 'Leblebi Soup' }),
    }));

    // await waitFor(() => expect(screen.findAllByAltText(/bloody/i)).toHaveLength(55));
    console.log(store.getState());
  });
});
