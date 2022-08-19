import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';

function Drinks() {
  return (
    <div>
      <Route exact path="/drinks" component={ Header } />
      drinks
    </div>
  );
}

export default Drinks;
