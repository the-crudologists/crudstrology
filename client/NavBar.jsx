import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavStyle, NavUl, NavUserInfo, NavImg } from './Styled.jsx'
import { UserContext } from './App.jsx';

const NavBar = () => {
  const { dob, sign, user } = useContext(UserContext);
  const viewObj = {};
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value
  };

  const getAvatar = (googleName) => (
    <NavImg src={`https://robohash.org/${googleName}?set=set5`} />
  );
  // 'FatTubBetty'  name
  return (
    <>
      <NavStyle>
        <div>{getAvatar(user || 'FatTubBetty')}</div>
        <NavUserInfo>
          <hr />
          <p>Name: {user || 'sign in'}</p>
          <p>DOB: {dob}</p>
          <p>Sign: {sign || 'Enter DOB'}</p>
          <hr />
        </NavUserInfo>

        <ul>
          <NavUl> <Link to="/" onClick={(e) => handleClick(e, 'Feed')}> Your Home </Link>
            <Link to="/astrology" onClick={(e) => handleClick(e, 'Scopes')}> Today's Horoscopes </Link>
            <Link to="/tarot" onClick={(e) => handleClick(e, 'Tarot')}> Get A reading </Link>
            <Link to="/favorites" onClick={(e) => handleClick(e, 'Favorites')}> Your Favorites </Link>
          </NavUl>
          {/* <Link to="/" onClick={(e) => handleClick(e, 'Dialog')}> Fortune Teller </Link>*/}
        </ul>

      </NavStyle >
    </>
  );
};

export default NavBar;
