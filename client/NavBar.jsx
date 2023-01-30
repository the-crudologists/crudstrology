import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavStyle, NavItem, NavUserInfo, NavImg, WrapCardText } from './Styled.jsx';
import { UserContext } from './App.jsx';
import axios from 'axios';
import zc from '../utils/zodiacConverter.js';

const NavBar = () => {
  const { dob, setDob, sign, setSign, user } = useContext(UserContext);
  const viewObj = {};
  const dobRef = useRef('');
  const handleClick = (e, option) => {
    viewObj[option] = e.target.value;
  };

  const handleChange = (input) => {
    dobRef.current = input;
  };

  const handleSubmit = () => {
    axios.get('/auth/user')
      .then((loggedInUser) => {
        axios.patch(`/user/${loggedInUser.data.googleId}`, { dob: dobRef.current, sign: zc(dobRef.current) })
          .then((anArrayResponse) => {
            setDob(anArrayResponse.data[0].dob);
            setSign(zc(anArrayResponse.data[0].dob));
          })
          .catch(err => {
            console.log('failed to update in db', err);
          });
      })
      .catch(err => {
        console.log('failed to verify current user', err);
      });
  };
  const getAvatar = (googleName) => (
    <NavImg src={`https://robohash.org/${googleName}?set=set5`} />
  );

  return (
    <NavStyle>
      <div>{getAvatar(user || 'FatTubBetty')}</div>
      <NavUserInfo>
        <hr />
        <WrapCardText>Name: {user || 'sign in'}</WrapCardText>
        <WrapCardText style={{display: 'block'}}>DOB:<input
          className='dobInput'
          style={{ color: 'black' }}
          placeholder={dob || 'Enter DOB as mm/dd'}
          onChange={
            (e) => {
              handleChange(e.target.value);
            }}
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }
          }
        />
        <button className='text' onClick={handleSubmit}>Submit</button></WrapCardText>
        <WrapCardText>Sign: {sign || 'Based on DOB'}</WrapCardText>
        <div>
          <a href="/auth/google">Authenticate with Google</a>
        </div>
        <hr />
      </NavUserInfo>
      <NavItem> <Link to="/" onClick={(e) => handleClick(e, 'Feed')}>Your Home</Link></NavItem>
      <NavItem> <Link to="/astrology" onClick={(e) => handleClick(e, 'Scopes')}>Horoscopes</Link></NavItem>
      <NavItem>  <Link to="/tarot" onClick={(e) => handleClick(e, 'Tarot')}>Get A reading</Link></NavItem>
      <NavItem> <Link to="/favorites" onClick={(e) => handleClick(e, 'Favorites')}>Favorite Quotes</Link></NavItem>
    </NavStyle >
  );
};

export default NavBar;
