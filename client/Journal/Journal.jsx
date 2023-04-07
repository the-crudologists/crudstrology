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
      <div className='left-column'>
       
        <UserEntries />
      </div>
   
      <div className='right-column'>
        <UserH />
      </div>
    </div>
  );
};

export default Journal;
