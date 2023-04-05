import React, { useState, useEffect } from 'react';
import ZenQuotes from './ZenQuotes.jsx';
import axios from 'axios';
import Chat from './Chat/Chat.jsx';

const Feed = () => {
  const [feed, setFeed] = useState([{ post: 'Loading...' }]);
  const [users, setUsers] = useState([{ name: 'X' }]);
  const [userPost, setUserPost] = useState([]);

  // Grab the posts made by a user
  const renderFeed = () => {
    axios.get('/users/feed')
      .then(({ data }) => {
        setFeed(data);
      })
      .catch((err) => {
        console.error('Failed to meet request:', err);
      });
  };

  // Renders the post to state
  useEffect(() => {
    renderFeed();
  }, []);

  // Renders the users to state after posts
  useEffect(() => {
    axios.get('/users/username')
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [feed]);

  // Renders a user to a post after the user populates
  useEffect(() => {
    const userPostArr = [];
    let userObj = {};
    feed.forEach(message => {
      users.forEach(user => {
        const userId = message.user_id;
        if (userId === user.user_id) {
          userObj.user = user.name;
          userObj.post = message.post;
          userPostArr.push(userObj);
          userObj = {};
        } else if (!userId && !user.user_id) {
          userObj.user = user.name;
          userObj.post = message.post;
          userPostArr.push(userObj);
          userObj = {};
        }
      });
    });
    setUserPost(userPostArr);
  }, [users]);

  return (
    <div style={{
      display: 'grid',
      'grid-template-columns': '1fr 1fr',
      'grid-gap': '20px',
      border: '1px solid black',
      width: '100%',
    }}>
      <div style={{
        'border-style': 'solid'
      }}>
        <h1 className='chat-feed'>Timeline</h1>
        <Chat userPost={userPost} />
      </div>
      <div style={{ display: 'inline-block', 'border-style': 'solid' }}>
        <h1 className='horo-title'>Wise Quotes</h1>
        <div style={{ fontSize: '20px' }}><b><p>Like a quote to add to Favorites</p></b></div>
        {/* <ZenQuotes /> */}
      </div>
    </div>

  );
};
export default Feed;
