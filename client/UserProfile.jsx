import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ProfileImg, AstroButton } from './Styled.jsx';
import { UserContext } from './App.jsx';

const UserProfile = () => {
  const { state } = useLocation();
  const { dob, setDob, sign, setSign, user } = useContext(UserContext);
  const [followButton, setFollowButton] = useState('');

  const followUser = () => {
    const followB = document.getElementById('follow-button');
    const unFollowB = document.getElementById('unFollow-button');
    const message = document.getElementById('follow-status');

    axios.post('/follow', { follow: state.user_id })
      .then(() => {
        followB.style.display = 'none';
        unFollowB.style.display = '';
        message.style.display = '';

        setTimeout(() => {
          message.style.display = 'none';
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to send request:', err);
      });
  };

  const unFollowUser = () => {
    const followB = document.getElementById('follow-button');
    const unFollowB = document.getElementById('unFollow-button');
    const message = document.getElementById('un-follow-status');

    axios.delete(`/follow/${state.user_id}`)
      .then(() => {
        followB.style.display = '';
        unFollowB.style.display = 'none';
        message.style.display = '';

        setTimeout(() => {
          message.style.display = 'none';
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to send request:', err);
      });
  };

  // Disabling follow button if user is on their own profile
  useEffect(() => {
    console.log('State', state);
    if (state.name === user) {
      // Sets the state to display that the user is on their own profile
      setFollowButton(
        <AstroButton
          style={{
            color: 'black',
            margin: 'auto',
            padding: '10px',
            backgroundColor: 'green',
          }}
          disabled
        >
          You
        </AstroButton>
      );
    } else {
      setFollowButton(
        <div>
          <AstroButton
            id='follow-button'
            style={{ color: 'black', margin: 'auto', padding: '10px' }}
            type='button'
            onClick={() => followUser()}
          >
          Follow
          </AstroButton>
          <AstroButton
            id='unFollow-button'
            style={{ color: 'black', margin: 'auto', padding: '10px', display: 'none' }}
            type='button'
            onClick={() => unFollowUser()}
          >
            UnFollow
          </AstroButton>
        </div>
      );
    }
  }, []);

  return (
    <div name='parent'>
      <div
        style={{
          display: 'inline-block',
          'border-style': 'solid',
          maxHeight: '100%',
        }}
      >
        <ProfileImg src={`https://robohash.org/${state.name}?set=set5`} />
        <div name='user-info' style={{ textAlign: 'center' }}>
          <h1 className='comp-title'>{state.name}</h1>
          {followButton}
          <p
            id='follow-status'
            style={{ display: 'none' }}
          >
            You are following {state.name}
          </p>
          <p
            id='un-follow-status'
            style={{ display: 'none' }}
          >
            You un-followed {state.name}
          </p>
          <h2 className='comp-sign'>{state.sign}</h2>
          <h2 className='comp-sign'>{state.dob}</h2>
        </div>
      </div>
      <Link to='/'>Go Back</Link>
    </div>
  );
};

export default UserProfile;
