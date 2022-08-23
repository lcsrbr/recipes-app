import React from "react";
import App from '../App';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import store from '../redux/store'
import { Provider } from 'react-redux';

describe('Tests the Login page', () => {
  it('Should test the Login page', () => {
    const history = createMemoryHistory()
    history.push('/')
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>,
      </Provider>
    )

    const buttonEnter = screen.getByTestId('login-submit-btn');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();

    userEvent.type(emailInput, 'email.com');
    userEvent.type(passwordInput, '1');

    expect(buttonEnter).toBeDisabled();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');

    expect(buttonEnter).toBeEnabled();
    userEvent.click(screen.getByTestId('login-submit-btn'));
  })
})
