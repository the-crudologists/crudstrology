import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const viewObj = {};
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value;
  };

  const getAvatar = (googleName) => (
    <img src={`https://robohash.org/${googleName}?set=set5`} />
  );

  return (
    <div className="navBar">
      <div>{getAvatar('FatTubBetty')}</div>
      <div id="userInfo">
        <hr />
        <p>Name: REDACTED</p>
        <p>DOB:  REDACTED</p>
        <p>Sign: REDACTED</p>
        <hr />
      </div>
      <ul>
        <Link to="/" onClick={(e) => handleClick(e, 'Feed')}> Your Home </Link>
        <Link to="/astrology" onClick={(e) => handleClick(e, 'Scopes')}> Today's Horoscopes </Link>
        <Link to="/tarot" onClick={(e) => handleClick(e, 'Tarot')}> Get A reading </Link>
        <Link to="/favorites" onClick={(e) => handleClick(e, 'Favorites')}> Your Faves </Link>
        {/* <Link to="/" onClick={(e) => handleClick(e, 'Dialog')}> Fortune Teller </Link>*/}
      </ul>
    </div>
  );
};

export default NavBar;

