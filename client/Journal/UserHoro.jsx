import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserHoro = () => {
  const [horoscope, setHoroscope] = useState(null);

  useEffect(() => {
    axios.get('/db/horo')
      .then(response => {
        setHoroscope(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!horoscope) {
    return <div>Loading...</div>;
  }

  return (
    <div className='UserHoro' >
      <h1 className='UserHoro-title'> Horoscope</h1>

      <div><b>description</b>: {horoscope.description}</div>
      <div><b>sunsign</b>: {horoscope.sunsign}</div>
      <div><b>mood</b>: <em>{horoscope.mood}</em></div>
      <div><b>keywords</b>: <em>{horoscope.keywords}</em></div>
      <div><b>intensity</b>: <em>{horoscope.intensity}</em></div>
    </div>
  );
};

export default UserHoro;