import React, { useState, useContext, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import TextBox from './QuillText.jsx';
import UserEntries from './UserEntries.jsx';
import UserH from './UserHoro.jsx';
const Journal = () => {
  return (
    <div className='Journal' style={{ display: 'flex', justifyContent: 'left' }}>
      <h1 className='Journal-title'>Journal </h1>
      <div className='left-column' style={{flex: 1, alignSelf: 'flex-end', marginRight: '20px'}}>
       
        <UserEntries />
      </div>
   
      <div className='right-column' style={{flex: 2}}>
        <UserH />
      </div>
    </div>
  );
};

export default Journal;
