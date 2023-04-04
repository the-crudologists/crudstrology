import React, { useState, useContext, useEffect } from 'react';

const UserHoro = () => {

  const reading = {
    horoscopeText: 'test',
    sign: 'testsign',
    mood: 'testmood',
    keywords: 'testkey',
    intensity: 'test intens',

  };
  return (
    <div className='UserHoro' >
      <h1 className='UserHoro-title'> Horoscope</h1>

      {
        Object.entries(reading).map((el, i) => {
          return <div key={i}><b>{el[0]}</b>: {el[0] === 'description' ? el[1] : <em>{el[1]}</em>}</div>;
        })
      }
    </div>


  );
};

export default UserHoro;
