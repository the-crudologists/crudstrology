import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavUl, NavUserInfo, NavImg } from './Styled.jsx'
const NavBar = () => {

  const viewObj = {};
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value;
  };

  const getAvatar = (googleName) => (
    <img src={`https://robohash.org/${googleName}?set=set5`} />
  );

  return (
    <Nav>
      <NavImg>{getAvatar('FatTubBetty')}</NavImg>
    <NavUserInfo>
        <hr />
        <p>Name: REDACTED</p>
        <p>DOB:  REDACTED</p>
        <p>Sign: REDACTED</p>
        <hr />
        </NavUserInfo>

      <ul>
        <NavUl> <Link to="/" onClick={(e) => handleClick(e, 'Feed')}> Your Home </Link>
          <Link to="/astrology" onClick={(e) => handleClick(e, 'Scopes')}> Today's Horoscopes </Link>
          <Link to="/tarot" onClick={(e) => handleClick(e, 'Tarot')}> Get A reading </Link>
          <Link to="/favorites" onClick={(e) => handleClick(e, 'Favorites')}> Your Faves </Link>
        </NavUl>
        {/* <Link to="/" onClick={(e) => handleClick(e, 'Dialog')}> Fortune Teller </Link>*/}
      </ul>

   </Nav >
  );
};

export default NavBar;

