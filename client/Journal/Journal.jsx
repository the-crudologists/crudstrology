import React, { useState, useContext, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import TextBox from './QuillText.jsx';
import UserEntries from './UserEntries.jsx';
import UserHoro from './UserHoro.jsx';
const Journal = () => {
  return (
    <div className='Journal' style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='left-column'>
       
        <UserEntries />
      </div>
      <div className='middle-column'>
        <TextBox />
      </div>
      <div className='right-column'>
        <UserHoro />
      </div>
    </div>
  );
};

export default Journal;
