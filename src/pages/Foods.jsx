import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';

function Foods() {
  return (
    <div>
      <Route exact path="/foods" component={ Header } />
      Foods
    </div>
  );
}

export default Foods;
