import React, { useState } from 'react';

const NavBar = () => {

  const viewObj = {};
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value;
  };

  return (
    <div>
      <span onClick={(e) => handleClick(e, 'Tarot')}>Get A Tareaux</span>
      <span onClick={(e) => handleClick(e, 'Reading')}>Today's Horror-scope</span>
      <span>Favorites</span>
      <span>Home</span>

    </div>
  );

};

export default NavBar;

