import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import axios from 'axios';
import { Fieldbox, } from '../Styled.jsx';

const UserH = () => {
  const [horoscope, setHoroscope] = useState(null);
  const { user, dob, sign, userId } = useContext(UserContext);
  const [bg, setBg] = useState('white');
  // console.log(userId)
  useEffect(() => {
    if (userId) {
      axios.post('/db/horo', {
        userId: userId
      })
        .then(response => {
          const intensity = response.data.intensity;
          let bgcolor = '';
          const intensityNumber = parseInt(intensity.replace('%', ''));
          //  const intensityNumber = 0;
          console.log(intensityNumber);
          if (intensityNumber === 0) {
            bgcolor = 'purple';
          } else if (intensityNumber === 100) {
            bgcolor = 'red';
          } else {
            const hue = (intensityNumber * 1.2);
            bgcolor = `hsl(${hue}, 100%, 50%)`;
          }
          console.log(bgcolor);
          setHoroscope(response.data);
          setBg(bgcolor);
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
      <Fieldbox style={{borderColor: bg }}> <h1 className='Fieldbox-title' > Horoscope</h1>

        <div><b>description</b>: {horoscope.description}</div>
      
        <div><b>mood</b>: <em>{horoscope.mood}</em></div>
        <div><b>keywords</b>: <em>{horoscope.keywords}</em></div>
        <div><b>intensity</b>: <em>{horoscope.intensity}</em></div>
      </Fieldbox> 
    </div>
  );
};

export default UserH;
