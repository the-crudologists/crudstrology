import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import axios from 'axios';
import { AstroButton, Fieldbox, OtherHoros } from '../Styled.jsx';

const UserH = () => {
  const [horoscope, setHoroscope] = useState(null);
  const { user, dob, sign, userId } = useContext(UserContext);
  // console.log(userId)
  useEffect(() => {
    if (userId) {
      axios.post('/db/horo', {
        userId: userId
      })
        .then(response => {
          setHoroscope(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [userId]);

  if (!horoscope) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className='UserHoro' >
      <Fieldbox> <h1 className='Fieldbox-title'> Horoscope</h1>

        <div><b>description</b>: {horoscope.description}</div>
      
        <div><b>mood</b>: <em>{horoscope.mood}</em></div>
        <div><b>keywords</b>: <em>{horoscope.keywords}</em></div>
        <div><b>intensity</b>: <em>{horoscope.intensity}</em></div>
      </Fieldbox> 
    </div>
  );
};

export default UserH;
