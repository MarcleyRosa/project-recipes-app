import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  const title = 'Meals';
  return (
    <div>
      <Header headers={ title } isRoute />
      <Footer />
    </div>
  );
}

export default Meals;
