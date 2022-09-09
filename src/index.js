import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import './App.css';

ReactDOM.render(
  <BrowserRouter className='bwto'>
    <Provider store={ store }>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
