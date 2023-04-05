import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = (props) => {
  const { userPost } = props;


  return (
    <div>
      <span>
        {userPost.map(post => <span style={{ 'text-align': 'left' }}><h3>{post.user}</h3>{post.post}</span>)}
      </span>
    </div >
  );
};

export default Chat;
