import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import TextBox from './QuillText.jsx';
import axios from 'axios';
import { JournalEntry, OtherHoros } from '../Styled.jsx';

const UserEntries = () => {
  const [entries, setEntries] = useState([]);
  const { user, dob, sign, userId } = useContext(UserContext);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showTextBox, setShowTextBox] = useState(false);
  
  useEffect(() => {
    if (userId) {
      axios.post('/db/userEntries/', {
        userId: userId
      })
        .then(response => {
          setEntries(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [userId]);

  const handleNewPost = (e) => {
    e.preventDefault();
    setShowTextBox(true);
    setSelectedEntry(null);
  };
  

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setShowTextBox(false);
  };

  return (
    <>
      <div className='UserEntries'>
        <h1 className='UserEntries-title'></h1>
        <ul>
          {entries.map(entry => (
            <li key={entry.id} onClick={() => handleEntryClick(entry)} className="JournalEntry">
              {entry.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedEntry && (
          <OtherHoros>{selectedEntry.body}</OtherHoros>
        )}
        {showTextBox && (
          <TextBox />
        )}
      </div>
        {!showTextBox && (
      <button onClick={handleNewPost}>New Entry</button>
    )}
    </>
  );
};

export default UserEntries;
