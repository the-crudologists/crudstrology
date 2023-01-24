import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const viewObj = {};
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value;
  };

  return (
    <div className="navBar">
      <ul>
        <Link to="/" onClick={(e) => handleClick(e, 'Home')}> Your Home </Link>
        <Link to="/" onClick={(e) => handleClick(e, 'Scopes')}> Today's Horoscopes </Link>
        <Link to="/" onClick={(e) => handleClick(e, 'Home')}> Get A reading </Link>
        <Link to="/" onClick={(e) => handleClick(e, 'Home')}> Your Faves </Link>
        <Link to="/" onClick={(e) => handleClick(e, 'Home')}> Fortune Teller </Link>
      </ul>
      <span onClick={(e) => handleClick(e, 'Reading')}>Today's Horror-scope</span>
      <span>Favorites</span>
      <span>Home</span>

    </div>
  );

};

export default NavBar;

