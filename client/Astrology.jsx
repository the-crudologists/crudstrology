import React, { useState, useContext } from 'react';
import fakeHoro from '../database/fakeData/horoscope.json';
import { UserContext } from './App.jsx';

const Astrology = () => {

  const [reading, setReading] = useState(fakeHoro);
  const { dob, sign } = useContext(UserContext);
  return (

    <div className='horoscope'>
      <h1 className='horo-title'>Your Daily Horoscope</h1>
      <p>Your birthday is {dob}, so your sign is {sign}.</p>
      <div id='horo-item' className='container'>
        {
          Object.entries(reading).map((el, i) => {
            return <div key={i}><b>{el[0]}</b>: <em>{el[1]}</em></div>;
          })
        }
      </div>
    </div>

  );
};

export default Astrology;

