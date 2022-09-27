import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const title = 'Drinks';
  return (
    <div>
      <Header headers={ title } isRoute />
      <Footer />
    </div>
  );
}

export default Drinks;
