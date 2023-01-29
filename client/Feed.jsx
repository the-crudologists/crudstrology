import React from 'react';
import ZenQuotes from './ZenQuotes.jsx';

const Feed = () => {
  return (

    <div>
      <h1 className='horo-title'>Zen Quotes</h1>
      <div style={{ fontSize: '20px' }}><b><p>Like a quote to add to Favorites</p></b></div>
      <ZenQuotes />
    </div>

  );
};

export default Feed;
