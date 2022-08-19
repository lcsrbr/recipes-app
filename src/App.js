import React from 'react';
// import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <div className="meals">
          <Routes />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
