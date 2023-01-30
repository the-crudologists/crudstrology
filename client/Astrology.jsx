import React, { useState, useContext, useEffect } from 'react';
import fakeHoro from '../database/fakeData/horoscope.json';
import { UserContext } from './App.jsx';
import { AstroButton, UserHoro, OtherHoros } from './Styled.jsx';
import axios from 'axios';

const Astrology = () => {
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const [reading, setReading] = useState(fakeHoro);
  const [horoscopes, setHoroscopes] = useState([]);
  const { dob, sign } = useContext(UserContext);

  const fetchHoro = (fetchSign) => {
    axios.post('/api/horo', {
      user: {
        sign: fetchSign
      }
    })
      .then(reading => {
        setReading(reading.data);
      })
      .catch(err => {
        console.log('Error AXIOS post to /api/horo from Client', err);
      });
  };

  const fetchOtherSigns = (userSign) => {
    setHoroscopes([]);
    zodiacSigns.forEach(el => {
      if (el !== userSign) {
        axios.post('/api/horo', {
          user: {
            sign: el
          }
        })
          .then(reading => {
            setHoroscopes(prevHoro => {
              return [...prevHoro, reading.data];
            });
          })
          .catch(err => console.log('ERROR populating horoscopes != sign array', err));
      }
    });
  };

  useEffect(() => fetchHoro(sign), [dob]);

  return (

    <div className='horoscope'>
      <h1 className='horo-title'>Your Daily Horoscope</h1>
      <div style={{ fontSize: '20px' }}><p><b>Your birthday is {dob}, so your sign is {sign}.</b></p></div>
      <AstroButton onClick={() => fetchOtherSigns(sign)} className='text'>Get Other Horoscopes</AstroButton>
      <UserHoro>
        {
          Object.entries(reading).map((el, i) => {
            return <div key={i}><b>{el[0]}</b>: {el[0] === 'description' ? el[1] : <em>{el[1]}</em>}</div>;
          })
        }
      </UserHoro>
      <p></p>
      <div style={{ fontSize: '20px' }}><p><b>The other 11 signs.</b></p></div>
      <div>
        {
          horoscopes.map((el, i) => {
            return (
              <OtherHoros key={i}>
                {Object.entries(el).map((attr, i) => {
                  return (
                    <div key={i}>
                      <b>{attr[0]}: </b><em>{attr[1]}</em>
                    </div>
                  );
                })}
              </OtherHoros>
            );
          })
        }
      </div>
    </div>

  );
};

export default Astrology;
