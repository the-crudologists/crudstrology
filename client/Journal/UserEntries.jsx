import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('/db/jEntry')
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='UserEntries'>
      <h1 className='UserEntries-title'>Entries</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.entry_id} onClick={() => console.log(entry.body)}>
            {entry.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEntries;
