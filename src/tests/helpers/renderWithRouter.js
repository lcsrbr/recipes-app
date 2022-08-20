import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import store from '../../redux/store'
import { Provider } from 'react-redux';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
        <Provider store={store}>
           <Router history={history}>
          {component}
           </Router>
        </Provider>
    ), history,
  });
};
export default renderWithRouter;