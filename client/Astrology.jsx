import React, { useState } from 'react';
import fakeHoro from '../database/fakeData/horoscope.json';

const Astrology = () => {

  const [reading, setReading] = useState(fakeHoro);

  return (
    <div className='horoscope'>
      <h1 className='horo-title'>Your Daily Horoscope</h1>
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

