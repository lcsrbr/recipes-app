import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import store from '../../redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event';

// const renderWithRouter = (component) => {
//   const history = createMemoryHistory();
//   return ({
//     ...render(
//         <Provider store={store}>
//            <Router history={history}>
//           {component}
//            </Router>
//         </Provider>
//     ), history,
//   });
// };

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    // user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  }
}
export default renderWithRouter;