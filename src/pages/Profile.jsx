import React from 'react';
import Header from '../components/Header';

function Profile() {
  const title = 'Profile';
  return (
    <div>
      <Header headers={ title } isRoute={ false } />
    </div>
  );
}

export default Profile;
