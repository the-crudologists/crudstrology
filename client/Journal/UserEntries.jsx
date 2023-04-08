import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import TextBox from './QuillText.jsx';
import axios from 'axios';
import { JournalButton, OtherHoros, UserHoro, Fieldbox } from '../Styled.jsx';

const UserEntries = () => {
  const [entries, setEntries] = useState([]);
  const { user, dob, sign, userId } = useContext(UserContext);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showTextBox, setShowTextBox] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchEntries();
    }
  }, [userId]);

  const fetchEntries = () => {
    axios.post('/db/userEntries/', {
      userId: userId
    })
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleNewPost = (e) => {
    e.preventDefault();
    setShowTextBox(true);
    setSelectedEntry(null);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setShowTextBox(false);
  };

   const handleEntrySubmit = () => {
    setShowTextBox(false);
    fetchEntries(); // update the entries list after submitting a new entry
  };

  return (
    <div style={{ display: 'flex' }}>
   
      <Fieldbox>
        <h1 className='FieldBox-title'>Entries</h1>
        <div className='UserEntries' style={{ overflowY: 'auto', maxHeight: '350px' }}>
          <ul style={{ justifyContent: 'left' }}>
            {entries.map(entry => (
              <OtherHoros key={entry.id} onClick={() => handleEntryClick(entry)} className="JournalEntry">
                {entry.title}
              </OtherHoros>
            ))}
          </ul>
        </div>
        {!showTextBox && (
          <JournalButton onClick={handleNewPost} style={{ marginLeft: 'auto' }}>New Entry</JournalButton>
        )}
      </Fieldbox>
         <Fieldbox>
        <h1 className='FieldBox-title'> Journal</h1>
        <div>
          {showTextBox && (
            <TextBox onSubmit={handleEntrySubmit} />
          )}
          {!showTextBox && selectedEntry && (
            <UserHoro>{selectedEntry.body}</UserHoro>
          )}
        </div>
      </Fieldbox>
    </div>
  );
};

export default UserEntries;