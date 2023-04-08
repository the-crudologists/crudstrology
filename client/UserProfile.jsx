import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ProfileImg, AstroButton, TarotCard } from './Styled.jsx';
import { UserContext } from './App.jsx';
import moment from 'moment';

const UserProfile = () => {
  const { state } = useLocation();
  const { dob, setDob, sign, setSign, user } = useContext(UserContext);
  const [followButton, setFollowButton] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

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

    axios.get(`/db/profile/${state.userId}`)
      .then(({data}) => setJournalEntries(data))
      .catch((err) => console.err(err));
  },[]);

  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '20px',
        border: '1px solid black',
        width: '100%',
        height: '600px',
        maxHeight: '600px'
      }}>
      <div
        style={{
          display: 'inline-block',
          'border-style': 'solid',
          maxHeight: '100%',
        }}
      >
        <ProfileImg src={`https://robohash.org/${state.currentUser.name}?set=set5`}  style={{ margin: 'auto', padding: '10px'}} />
        <div name='user-info' style={{ textAlign: 'center'}}>
          <h1 className='comp-title'>{state.currentUser.name}</h1>
          {followButton}
          <h2 className='comp-sign'>{state.currentUser.sign}</h2>
          <h2 className='comp-sign'>{state.currentUser.dob}</h2>
        </div>
      </div>
      {/* <Link to='/'>Go Back</Link> */}
      <div style={{ display: 'inline-block', borderStyle: 'solid', maxHeight: '100%'}}>
        {journalEntries.map((entry) => {
          return (
            <TarotCard>
            <div>
                 {entry.body}
                {moment(entry.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </div>
            </TarotCard>
          );
        })}
      </div>
      <div
        style={{
          display: 'inline-block',
          'border-style': 'solid',
          maxHeight: '100%',
        }}
      >followers or friends section
       <ProfileImg src={`https://robohash.org/${state.currentUser.name}?set=set5`}  style={{ margin: 'auto', padding: '5px', height: '50px'}} />
      </div>
    </div>
  );
};

export default UserProfile;
