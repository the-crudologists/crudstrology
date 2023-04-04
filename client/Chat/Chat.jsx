import React from 'react';


const Chat = (props) => {
  const { feed } = props;
  return (
    <div style={{ 'border-style': 'solid' }}>
      <span style={{ 'border-style': 'solid' }}>
        {feed.map(message => <span style={{ 'border-style': 'solid' }}>{message.post}</span>)}
      </span>
    </div >
  );
};

export default Chat;
