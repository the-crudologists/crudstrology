import React, { useState, useContext, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { UserContext } from '../App.jsx';
import 'quill/dist/quill.snow.css';
const axios = require('axios');

const TextBox = () => {

  const { user, dob, sign, userId } = useContext(UserContext);

  const { quill, quillRef } = useQuill();
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [showTextBox, setShowTextBox] = useState(true);
  
  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<h1>Thoughts</h1>');
    }
  }, [quill]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEntrySubmit = () => {
    if (quillRef.current) {
      const newEntry = quillRef.current.querySelector('.ql-editor').innerText;
      setEntries(prevEntries => [...prevEntries, { title, entry: newEntry }]);
      axios.post('/db/jEntry', {
        data: {
          title,
          entry: newEntry,
          userId: userId
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      setTitle('');
      setShowTextBox(false);
    }
  };

  // console.log(quill); // undefined > Quill Object
  // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <>
      {showTextBox && (
        <div className='TextBox'>
          <h1 className='TextBox-title'>New Entry</h1>

          <label htmlFor='title'>Title:</label>
          <input id='title' type='text' value={title} onChange={handleTitleChange} />

          <div style={{ width: 500, height: 300 }}>
            <div ref={quillRef} />
            <button className='text' onClick={
              handleEntrySubmit}>Submit</button>
          </div>
        
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <h3>{entry.title}</h3>
                <p>{entry.entry}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TextBox;
