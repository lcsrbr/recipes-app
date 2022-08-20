import React from "react";
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";

describe('Tests the Login page', () => {
  it('Should test the Login page', () => {
    const {history, getByTestId, getByRole } = renderWithRouter(<App />);

    const buttonEnter = getByTestId('login-submit-btn');
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
    userEvent.click(getByTestId('login-submit-btn'));
  })
})
