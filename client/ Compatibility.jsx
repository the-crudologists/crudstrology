import React, { useState, useEffect } from 'react';
import {
  CompatibilityInput,
  CompatibilityButton,
  TarotCard,
} from './Styled.jsx';
import axios from 'axios';
//require('dotenv').config

const Compatibility = () => {
  //Using useEffect to fetch the current users' zodiac sign, in order to set sign1's input field defaultValue to their respective zodiac sign
  // useEffect(() => {
  //     axios.get('/auth/user')
  //       .then(user => {
  //         setSign1(user.data.sign);
  //       })
  //       .catch(err => {
  //         console.log('Error fetching Authenticated Google User from req.user (server/passport)', err);
  //       });
  //   }, []);

  const [sign1, setSign1] = useState(''); //Note to self: change this to the users' sign when able
  const [sign2, setSign2] = useState('');
  const zodiacSigns = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];
  const zodiacSignsDates = [
    'Aries (March 21 - April 19)',
    'Taurus (April 20 - May 20)',
    'Gemini (May 21 - June 20)',
    'Cancer (June 21 - July 22)',
    'Leo (July 23 - August 22)',
    'Virgo (August 23 - September 22)',
    'Libra (September 23 - October 22)',
    'Scorpio (October 23 - November 21)',
    'Sagittarius (November 22 - December 21)',
    'Capricorn (December 22 - January 19)',
    'Aquarius (January 20 - February 18)',
    'Pisces (February 19 - March 20',
  ];

  const getCompatibility = () => {
    const options = {
      method: 'GET',
      url: 'https://horoscope-astrology.p.rapidapi.com/affinity',
      params: { sign1: `${sign1}`, sign2: `${sign2}` },
      headers: {
        'X-RapidAPI-Key': '511614080cmshd904ca8292330bcp1c75bbjsnbf2078960186',
        'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com',
      },
    };

    // When a user clicks submit, data from the API should be fetched through a GET request
    axios(options)
      .then(({ data }) =>
        console.log('This is the response given from the compat api', data)
      )
      .catch();
  };

  return (
    <div name='parent'>
      {console.log('sign1', sign1)}
      <h1 className='comp-title'>Compatibility Selector</h1>
      {/* First Zodiac Sign Input */}
      <label name='sign-1'>
        Enter first zodiac sign:
        <CompatibilityInput
          list='signs'
          name='myBrowser'
          defaultValue={sign1}
          onChange={(e) => {
            setSign1(e.target.value);
          }}
        />
      </label>
      <datalist id='signs' bottom='100%'>
        {zodiacSigns.map((sign) => {
          return <option value={sign} />;
        })}
      </datalist>
      {/* Second Zodiac Sign Input */}
      <label name='sign-2'>
        Enter second zodiac sign:
        <CompatibilityInput
          list='signs'
          name='myBrowser'
          onChange={(e) => {
            setSign2(e.target.value);
          }}
        />
      </label>
      <datalist id='signs'>
        {zodiacSigns.map((sign) => {
          return <option value={sign} />;
        })}
      </datalist>
      {/* Submit Button */}
      <CompatibilityButton
        onClick={() => {
          getCompatibility();
        }}
      >
        Submit &hearts;{' '}
      </CompatibilityButton>
      <br></br>
      <h1 className='comp-results-title'>Compatibility Results</h1>
      <TarotCard>Hello world</TarotCard>
    </div>
  );
};

export default Compatibility;
