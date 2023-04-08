import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ProfileImg, AstroButton, TarotCard } from './Styled.jsx';
import { UserContext } from './App.jsx';
import moment from 'moment';

const UserProfile = () => {
  const { state } = useLocation();
  const { dob, setDob, sign, setSign, user } = useContext(UserContext);
  const [journalEntries, setJournalEntries] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);

  const getUser = () => {
    axios
      .get('/user/user')
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  const getFollowersList = (id) => {
    axios
      .get(`/db/follow/list/${id}`)
      .then(({ data }) => {
        setFriendsList(data);
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  const getUserFollowersList = (id) => {
    axios
      .get(`/db/follow/list/${id}`)
      .then(({ data }) => {
        setUserFollowers(data);
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  const followUser = () => {
    const followB = document.getElementById('follow-button');
    const unFollowB = document.getElementById('unFollow-button');
    const message = document.getElementById('follow-status');

    const data = {
      user: state.currentUser.user_id,
    };

    axios
      .post('/follow', data)
      .then(() => {
        followB.style.display = 'none';
        unFollowB.style.display = '';
        message.style.display = '';
        getUserFollowersList(currentUser.user_id);

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

    axios
      .delete(`/follow/${state.userId}`)
      .then(() => {
        followB.style.display = '';
        unFollowB.style.display = 'none';
        message.style.display = '';
        getUserFollowersList(currentUser.user_id);

        setTimeout(() => {
          message.style.display = 'none';
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to send request:', err);
      });
  };

  // Fetch friends list on render
  useEffect(() => {
    getUser();
    getFollowersList(state.userId);
  }, []);

  useEffect(() => {
    getUserFollowersList(currentUser.user_id);
  }, [currentUser]);

  // Disabling follow button if user is on their own profile
  useEffect(() => {
    const userButton = document.getElementById('userButton');
    const followButton = document.getElementById('follow-button');
    const unFollowButton = document.getElementById('unFollow-button');

    if (state.currentUser.name === currentUser.name) {
      userButton.style.display = '';
    } else {
      for (let i = 0; i < userFollowers.length; i++) {
        if (userFollowers[i].name === state.currentUser.name) {
          unFollowButton.style.display = '';
          followButton.style.display = 'none';
          break;
        } else {
          followButton.style.display = '';
          unFollowButton.style.display = 'none';
        }
      }
    }

    axios
      .get(`/db/profile/${state.userId}`)
      .then(({ data }) => setJournalEntries(data))
      .catch((err) => console.err(err));
  }, [userFollowers]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '20px',
        border: '1px solid black',
        width: '100%',
        height: '600px',
        maxHeight: '600px',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          'border-style': 'solid',
          maxHeight: '100%',
          overflow: 'hidden'
        }}
      >
        <ProfileImg
          src={`https://robohash.org/${state.currentUser.name}?set=set5`}
          style={{ marginLeft: '150px', padding: '10px' }}
        />
        <div name='user-info' style={{ textAlign: 'center' }}>
          <h1 className='comp-title'>{state.currentUser.name}</h1>
          <AstroButton
            id='userButton'
            style={{
              color: 'black',
              margin: 'auto',
              padding: '10px',
              backgroundColor: 'green',
              display: 'none'
            }}
          >
            You
          </AstroButton>

          <AstroButton
            id='follow-button'
            style={{ color: 'black', margin: 'auto', padding: '10px', display: 'none' }}
            type='button'
            onClick={() => followUser()}
          >
            Follow
          </AstroButton>

          <AstroButton
            id='unFollow-button'
            style={{
              color: 'black',
              margin: 'auto',
              padding: '10px',
              display: 'none',
            }}
            type='button'
            onClick={() => unFollowUser()}
          >
            UnFollow
          </AstroButton>

          <p id='follow-status' style={{ display: 'none' }}>
            You are following {state.currentUser.name}
          </p>
          <p id='un-follow-status' style={{ display: 'none' }}>
            You un-followed {state.currentUser.name}
          </p>
          <h2 className='comp-sign'>{state.currentUser.sign}</h2>
          <h2 className='comp-sign'>{state.currentUser.dob}</h2>
        </div>
      </div>
      {/* <Link to='/'>Go Back</Link> */}
      <div
        style={{
          display: 'inline-block',
          borderStyle: 'solid',
          maxHeight: '100%',
          overflow: 'hidden'
        }}
      >
        {journalEntries.map((entry) => {
          return (
            <TarotCard>
              <div>
               <div dangerouslySetInnerHTML={{ __html: entry.body }}></div>
                {/* {entry.body} */}
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
          overflow: 'hidden'
        }}
      >
        <h1 style={{ textAlign: 'center' }}>
          <u>Follow List</u>
        </h1>
        <div style={{ overflow: 'auto', textAlign: 'center', maxHeight: '85%'}}>
          {friendsList.map((friend, i) => {
            return (
              <div className='quote' style={{ display: 'flex' }}>
                <ProfileImg
                  src={`https://robohash.org/${friend.name}?set=set5`}
                  style={{
                    marginLeft: '125px',
                    marginBottom: '20px',
                    height: '75px',
                  }}
                />
                <h2 style={{ marginLeft: '30px', marginTop: '41px' }}>
                  {friend.name}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
