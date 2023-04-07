import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import axios from 'axios';
import { AstroButton, UserHoro,  OtherHoros } from '../Styled.jsx';

const UserH = () => {
  const [horoscope, setHoroscope] = useState(null);
  const { user, dob, sign, userId } = useContext(UserContext);
  // console.log(userId)
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
    <UserHoro> <h1 className='UserHoro-title'> Horoscope</h1>

      <div><b>description</b>: {horoscope.description}</div>
      
      <div><b>mood</b>: <em>{horoscope.mood}</em></div>
      <div><b>keywords</b>: <em>{horoscope.keywords}</em></div>
      <div><b>intensity</b>: <em>{horoscope.intensity}</em></div>
      </UserHoro> 
    </div>
  );
};

export default UserH;
