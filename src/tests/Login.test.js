import React from "react";
import { render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith'
import store from '../redux/store'
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Tests the Login page', () => {
  it('Should test the Login page', () => {
    const history = createMemoryHistory();
    const { getByTestId, getByRole } = render(
      <Router history={ history }>
        <Provider store={ store }>
           <App />
        </Provider>
      </Router>
    )
    const buttonEnter = getByRole('button', { name: /enter/i});
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();

    userEvent.type(emailInput, 'email.com');
    userEvent.type(passwordInput, '1');

    expect(buttonEnter).toBeDisabled();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');

    expect(buttonEnter).toBeEnabled();
    userEvent.click(buttonEnter);
  })
})
