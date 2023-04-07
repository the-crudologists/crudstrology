import React, { useState, useContext, useEffect, } from 'react';
import fakeHoro from '../database/fakeData/horoscope.json';
import { UserContext } from './App.jsx';
import { AstroButton, UserHoro, OtherHoros } from './Styled.jsx';
import axios from 'axios';


const Astrology = () => {
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const [reading, setReading] = useState(fakeHoro);
  const [horoscopes, setHoroscopes] = useState([]);
  const { user ,dob, sign, userId } = useContext(UserContext);

  const generateLuckyTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const amPm = Math.random() < 0.5 ? 'am' : 'pm';
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${amPm}`;
  };
  const generateLuckyNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };


  const fetchHoro = (fetchSign) => {
    axios.post('/api/horo', {
      data: {
        user: userId,
        sign: fetchSign
      }
    })
      .then(reading => {
        // console.log(reading.data);
  
       
        setReading(reading.data);
      })
      .catch(err => {
        console.log('Error AXIOS post to /api/horo from Client', err);
      });
  };

  const fetchOtherSigns = (userSign) => {
    setHoroscopes([]);
    // iterates through the array and does an api call for every sign that isnt selected
    zodiacSigns.forEach(el => {
      if (el !== userSign) {
        axios.post('/api/horo', {
          data: {
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
      <h1 className='horo-title'>Horoscopes </h1>
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
