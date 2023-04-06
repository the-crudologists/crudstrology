import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import axios from 'axios';

const UserHoro = () => {
  const [horoscope, setHoroscope] = useState(null);
const { user, dob, sign, userId } = useContext(UserContext);
  useEffect(() => {
    axios.post('/db/horo', {
      userId: userId
    })
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