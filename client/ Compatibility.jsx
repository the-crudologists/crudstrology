import React, { useState, useEffect } from 'react';
import {
  CompatibilityInput,
  CompatibilityButton,
  TarotCard,
  CompNavBarInline,
  NavItem,
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

  const [sign1, setSign1] = useState(''); //Note to self: change to user's sign
  const [sign2, setSign2] = useState('');

  const [resultsHeader, setResultHeader] = useState('');
  const [results, setResults] = useState('');
  const [planets, setPlanets] = useState('');
  const [elements, setElements] = useState('');
  const [modalities, setModalities] = useState('');
  const [highlightsHeader, setHighlightsHeader] = useState('');
  const [highlights, setHighlights] = useState('');
  const [displayText, setDisplayText] = useState(
    'Choose your two zodiac signs to get started!'
  );
  const [displayHeader, setDisplayHeader] = useState('');
  const [navBar, setNavBar] = useState('');

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
    // When a user clicks submit, data from the API should be fetched through a GET request
    axios
      .get(`api/compatibility/${sign1}/${sign2}`)
      .then(({ data }) => {
        console.log(data, 'this is the display header');
        setDisplayHeader(data[0].header);
        setDisplayText(data[0].text);
        setResultHeader(data[0].header);
        setResults(data[0].text);
        setPlanets(data[1].text);
        setElements(data[2].text);
        setModalities(data[3].text);
        setHighlightsHeader(data[4].header);
        setHighlights(data[4].text);
      })
      .catch((err) => console.log('Error in retrieving from comp api'));
  };

  const showNavBar = () => {
    setNavBar(
      <CompNavBarInline>
        <NavItem
          onClick={() => {
            setDisplayHeader(resultsHeader);
            setDisplayText(results);
          }}
        >
          Main
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader('Planets');
            setDisplayText(planets);
          }}
        >
          Planets
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader('Elements');
            setDisplayText(elements);
          }}
        >
          Elements
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader('Modalities');
            setDisplayText(modalities);
          }}
        >
          Modalities
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader(highlightsHeader);
            setDisplayText(highlights);
          }}
        >
          Highlights
        </NavItem>
      </CompNavBarInline>
    );
  };

  return (
    <div name='parent'>
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

      <h1 className='comp-results-title'>Compatibility Results</h1>

      <CompNavBarInline>
        <NavItem
          onClick={() => {
            setDisplayHeader(resultsHeader);
            setDisplayText(results);
          }}
        >
          Main
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader('Planets');
            setDisplayText(planets);
          }}
        >
          Planets
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader('Elements');
            setDisplayText(elements);
          }}
        >
          Elements
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader('Modalities');
            setDisplayText(modalities);
          }}
        >
          Modalities
        </NavItem>
        <NavItem
          onClick={() => {
            setDisplayHeader(highlightsHeader);
            setDisplayText(highlights);
          }}
        >
          Highlights
        </NavItem>
      </CompNavBarInline>

      <TarotCard>
        <h2>{displayHeader}</h2>
        <ul>
          <li>{displayText}</li>
        </ul>
      </TarotCard>
    </div>
  );
};

export default Compatibility;
