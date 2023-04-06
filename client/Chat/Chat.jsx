import React, { useState, useEffect } from 'react';

const Chat = (props) => {
  const { userPost } = props;

  return (
    <div>
      {userPost.map((post, i) => {
        return (
          <div className='quote' key={i}>
            <a href="/user/profile" style={{ fontWeight: 'bold', fontSize: '18px' }}>{post.user}</a>:
            <span style={{ marginLeft: '10px' }}>{post.post}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
