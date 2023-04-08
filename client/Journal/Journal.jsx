import React from 'react';
import 'quill/dist/quill.snow.css';
import UserEntries from './UserEntries.jsx';
import UserH from './UserHoro.jsx';

const Journal = () => {
  return (
    <div className='Journal' style={{ display: 'flex', justifyContent: 'left' }}>
      {/* <h1 className='Journal-title'>Journal </h1> */}
      <div className='left-column' style={{flex: 2, alignSelf: 'flex-end',}}>
        <UserEntries />
      </div>
  
      <div className='right-column' style={{flex: 2}}>
        <UserH />
      </div>
    </div>
  );
};

export default Journal;
