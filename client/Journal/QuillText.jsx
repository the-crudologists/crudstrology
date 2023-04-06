import React, { useState, useContext, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { UserContext } from '../App.jsx';
import 'quill/dist/quill.snow.css';
const axios = require('axios');

const TextBox = () => {

  const { user, dob, sign, userId } = useContext(UserContext);

  const { quill, quillRef } = useQuill();
  const [entries, setEntries] = useState([]);
  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<h1>Thoughts</h1>');
    }
  }, [quill]);

  const handleButtonClick = () => {
    if (quillRef.current) {
      // console.log(quillRef.current.querySelector('.ql-editor').innerText);
      const newEntry = quillRef.current.querySelector('.ql-editor').innerText;
      setEntries(prevEntries => [...prevEntries, newEntry]);
      axios.post('/db/jEntry', {
        data: {
          newEntry: newEntry,
          userId: userId}
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  // console.log(quill); // undefined > Quill Object
  // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div className='TextBox'>
      <h1 className='TextBox-title'> TextBox</h1>
      <div style={{ width: 500, height: 300 }}>
        <div ref={quillRef} />
        <button className='text' onClick={handleButtonClick}>Submit</button>
      </div>
      {entries.map((entry, index) => (
        <li key={index}>{entry}</li>
      ))}
    </div>
  );
};

export default TextBox;
