import React from 'react';
import Header from '../components/Header';

function Meals() {
  const title = 'Meals';
  return (
    <div>
      <Header headers={ title } isRoute />
    </div>
  );
}

export default Meals;
