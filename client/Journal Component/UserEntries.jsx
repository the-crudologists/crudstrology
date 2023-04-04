import React, { useState, useContext, useEffect } from 'react';

const UserEntries = () => {
  const test = ['test 1', 'test 2', 'test 3', 'test 4', 'test 5'];

  return (
    <div className='UserEntries'>
      <h1 className='UserEntries-title'> Entries</h1>
      <ul>
        {test.map((entry, index) => (
          <li key={index}onClick={() => console.log(entry)}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};


export default UserEntries;
