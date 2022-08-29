import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/reducer/user';
import '../Css/Login.css';
import recipesLoginImage from '../images/recipes-login.svg';

const minLength = 6;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(saveUser(email));

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    history.push('/foods');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-orange-300">
      <div
        className="
      bg-white
       mx-auto
       max-w-md
        mt-5 py-8
         px-10
         shadow
         rounded-lg
         skew-y-3
          hover:-skew-y-0
          hover:translate-y-6
           transition
           duration-300 "
      >
        <div className="mb-4">
          <img src={ recipesLoginImage } alt="recipes" />
        </div>
      </div>

      <div className="p-10">
        <div className="mb-6 mt-10">
          <input
            className="focus:animate-pulse
             apperance-none
             block w-full
             px-4 py-3
             leading-tight
              text-gray-700
               bg-gray-50
                focus:bg-white border
                 border-gray-200
                  focus:border-gray-500
                  rounded
                   focus:outline-none"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="Email"
          />
        </div>

        <div className="mb-5">
          <input
            className="
            focus:animate-pulse
            apperance-none
            block w-full
             px-4
              py-3
              leading-tight
               text-gray-700
                bg-gray-50
                 focus:bg-white border
                  border-gray-200
                   focus:border-gray-500
                   rounded
                   focus:outline-none"
            type="text"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Password"
          />
        </div>

        <div className="mb-4 flex justify-center">
          <button
            className="animate-bounce
             inline-block
             w-30 mt-10
             px-8 py-4
             leading-none
              text-white
               bg-orange-500
                hover:bg-orange-700
                transition
                duration-300
                font-semibold
                rounded
                shadow "
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleClick }
            disabled={
              !(password.length > minLength && EmailValidator.validate(email))
            }
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
