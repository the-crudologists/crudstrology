import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import axios from 'axios';

const UserEntries = () => {
  const [entries, setEntries] = useState([]);
  const { user, dob, sign, userId } = useContext(UserContext);
  
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

  return (
    <div className='UserEntries'>
      <h1 className='UserEntries-title'>Entries</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id} onClick={() => console.log(entry.body)}>
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEntries;
