import React, { useState, useEffect } from 'react';
import ZenQuotes from './ZenQuotes.jsx';
import axios from 'axios';
import Chat from './Chat/Chat.jsx';

const Feed = () => {
  const [feed, setFeed] = useState([{ post: 'Loading...' }]);

  const renderFeed = () => {
    axios.get('/users/feed')
      .then(({ data }) => {
        setFeed(data);
      })
      .catch((err) => {
        console.error('Failed to meet request:', err);
      });
  };

  useEffect(() => {
    renderFeed();
  }, []);

  return (
    <div>
      {/* <h1 className='horo-title'>Wise Quotes</h1>
      <div style={{ fontSize: '20px' }}><b><p>Like a quote to add to Favorites</p></b></div> */}
      {/* <ZenQuotes /> */}
      <hi className='chat-feed'>Timeline</hi>
      <Chat feed={feed} />
    </div>

  );
};
export default Feed;
