import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavStyle, NavUl, NavUserInfo, NavImg } from './Styled.jsx';
import { UserContext } from './App.jsx';

const NavBar = () => {
  const { dob, setDob, sign, setSign, user } = useContext(UserContext);
  const viewObj = {};
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value;
  };

  const handleSubmit = () => {
    const userDob = ''; 
    console.log('robits');
  };
  const getAvatar = (googleName) => (
    <img src={`https://robohash.org/${googleName}?set=set5`} />
  );
  // 'FatTubBetty'  name 
  return (

    <div className="navBar">
      <div>{getAvatar(user || 'FatTubBetty')}</div>
      <hr />
      <p>Name: {user || 'sign in'}</p>
      <p>DOB:<input
        className='dobInput'
        style={{ color: 'black' }}
        placeholder={dob || 'Enter DOB'}
        onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }
        }
      />
      <button className='text' onClick={handleSubmit}>Submit</button></p>
      <p>Sign: {sign || 'Enter DOB as mm/dd'}</p>
      <hr />

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
