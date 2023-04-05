import React, { useState, useEffect } from 'react';
import {
  CompatibilityInput,
  CompatibilityButton,
  TarotCard,
  CompNavBarInline,
  NavItem,
  SignChartButton,
  TooltipBox,
  TooltipCard,
  NavBarInline
} from './Styled.jsx';
import axios from 'axios';

const Compatibility = () => {
  //Using useEffect to fetch the current users' zodiac sign, in order to set sign1's input field defaultValue to their respective zodiac sign
  useEffect(() => {
    axios
      .get('/auth/user')
      .then(({ data }) => {
        setSign1(data[0].sign);
      })
      .catch((err) => {
        console.log(
          'Error fetching Authenticated Google User from req.user (server/passport)',
          err
        );
      });
  }, []);

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
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

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
        setDisplayHeader(<div>{data[0].header}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path fill="url(#a)" d="M16.131 3.714A5.005 5.005 0 0 0 12 5.891a5.005 5.005 0 0 0-4.131-2.177 5.014 5.014 0 0 0-5.012 5.012c0 6.108 9.143 11.6 9.143 11.6s9.143-5.492 9.143-11.6a5.014 5.014 0 0 0-5.012-5.012Z"/><path fill="url(#b)" d="M18.206 4.16c2.742 4.372.217 10.109-2.817 11.737-3.35 1.8-5.64.955-10.383-1.737C7.708 17.743 12 20.32 12 20.32s9.143-5.491 9.143-11.6a5.015 5.015 0 0 0-2.937-4.56Z" opacity=".5"/><path fill="url(#c)" d="M16.131 3.714A5.005 5.005 0 0 0 12 5.891a5.005 5.005 0 0 0-4.131-2.177 5.014 5.014 0 0 0-5.012 5.012c0 6.108 9.143 11.6 9.143 11.6s9.143-5.492 9.143-11.6a5.014 5.014 0 0 0-5.012-5.012Z" opacity=".5"/><path fill="url(#d)" d="M16.131 3.714A5.005 5.005 0 0 0 12 5.891a5.005 5.005 0 0 0-4.131-2.177 5.014 5.014 0 0 0-5.012 5.012c0 6.108 9.143 11.6 9.143 11.6s9.143-5.492 9.143-11.6a5.014 5.014 0 0 0-5.012-5.012Z" opacity=".5"/><path fill="url(#e)" d="M10.749 5.749c.502 1.183-.612 2.788-2.492 3.583-1.88.794-3.806.485-4.308-.692-.503-1.177.611-2.788 2.491-3.583 1.88-.794 3.806-.491 4.309.692Z" opacity=".24"/><path fill="url(#f)" d="M16.874 4.789c.715.788.274 2.348-.977 3.48-1.251 1.131-2.846 1.411-3.56.623-.714-.789-.274-2.349.977-3.48C14.566 4.28 16.16 4 16.874 4.789Z" opacity=".24"/><path fill="url(#g)" d="M16.223 5.046c2.514.857 4.914 4.571.857 9.2-2.428 2.771-5.08 4.171-8.451 3.623a30.45 30.45 0 0 0 3.377 2.457s9.143-5.492 9.143-11.6a5.023 5.023 0 0 0-5.018-5.012 5.005 5.005 0 0 0-4.13 2.177s2.382-1.474 4.222-.845Z" opacity=".32"/><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(12.46295 -7.0248 5.57245 9.88628 9.385 8.348)" gradientUnits="userSpaceOnUse"><stop offset=".248" stop-color="red"/><stop offset=".864" stop-color="#C20000"/></radialGradient><radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(10.73016 -6.0481 4.7977 8.51177 9.739 7.47)" gradientUnits="userSpaceOnUse"><stop offset=".248" stop-color="red"/><stop offset="1" stop-color="#C20000"/></radialGradient><radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="matrix(12.46295 -7.0248 5.57245 9.88628 9.385 8.348)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="d" cx="0" cy="0" r="1" gradientTransform="rotate(-26.296 35.528 -24.494) scale(10.4431 5.16038)" gradientUnits="userSpaceOnUse"><stop stop-color="#BD2719" stop-opacity=".25"/><stop offset="1" stop-color="#BD2719" stop-opacity="0"/></radialGradient><radialGradient id="e" cx="0" cy="0" r="1" gradientTransform="matrix(3.44964 -1.37214 .85235 2.14287 7.347 7.195)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="f" cx="0" cy="0" r="1" gradientTransform="matrix(2.3281 -2.00697 1.24678 1.44628 14.6 6.846)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="g" x1="13.887" x2="15.658" y1="26.85" y2="2.964" gradientUnits="userSpaceOnUse"><stop stop-color="#860805"/><stop offset="1" stop-color="#BD2719" stop-opacity="0"/></linearGradient></defs></svg>
        </div>);
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
    setIsNavBarVisible(true);
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
          showNavBar();
        }}
      >
        Submit &hearts;{' '}
      </CompatibilityButton>
      {/* <TooltipCard> <SignChartButton>Not sure?</SignChartButton><TooltipBox><p>First item</p></TooltipBox></TooltipCard> */}

      <h1 className='comp-results-title'>Compatibility Results</h1>

      {isNavBarVisible && (
        <CompNavBarInline>
          <NavItem
            onClick={() => {
              setDisplayHeader(<div>{resultsHeader} <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                <path fill="url(#a)" d="M16.131 3.714A5.005 5.005 0 0 0 12 5.891a5.005 5.005 0 0 0-4.131-2.177 5.014 5.014 0 0 0-5.012 5.012c0 6.108 9.143 11.6 9.143 11.6s9.143-5.492 9.143-11.6a5.014 5.014 0 0 0-5.012-5.012Z"/>
                <path fill="url(#b)" d="M18.206 4.16c2.742 4.372.217 10.109-2.817 11.737-3.35 1.8-5.64.955-10.383-1.737C7.708 17.743 12 20.32 12 20.32s9.143-5.491 9.143-11.6a5.015 5.015 0 0 0-2.937-4.56Z" opacity=".5"/>
                <path fill="url(#c)" d="M16.131 3.714A5.005 5.005 0 0 0 12 5.891a5.005 5.005 0 0 0-4.131-2.177 5.014 5.014 0 0 0-5.012 5.012c0 6.108 9.143 11.6 9.143 11.6s9.143-5.492 9.143-11.6a5.014 5.014 0 0 0-5.012-5.012Z" opacity=".5"/>
                <path fill="url(#d)" d="M16.131 3.714A5.005 5.005 0 0 0 12 5.891a5.005 5.005 0 0 0-4.131-2.177 5.014 5.014 0 0 0-5.012 5.012c0 6.108 9.143 11.6 9.143 11.6s9.143-5.492 9.143-11.6a5.014 5.014 0 0 0-5.012-5.012Z" opacity=".5"/>
                <path fill="url(#e)" d="M10.749 5.749c.502 1.183-.612 2.788-2.492 3.583-1.88.794-3.806.485-4.308-.692-.503-1.177.611-2.788 2.491-3.583 1.88-.794 3.806-.491 4.309.692Z" opacity=".24"/><path fill="url(#f)" d="M16.874 4.789c.715.788.274 2.348-.977 3.48-1.251 1.131-2.846 1.411-3.56.623-.714-.789-.274-2.349.977-3.48C14.566 4.28 16.16 4 16.874 4.789Z" opacity=".24"/>
                <path fill="url(#g)" d="M16.223 5.046c2.514.857 4.914 4.571.857 9.2-2.428 2.771-5.08 4.171-8.451 3.623a30.45 30.45 0 0 0 3.377 2.457s9.143-5.492 9.143-11.6a5.023 5.023 0 0 0-5.018-5.012 5.005 5.005 0 0 0-4.13 2.177s2.382-1.474 4.222-.845Z" opacity=".32"/>
                <defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(12.46295 -7.0248 5.57245 9.88628 9.385 8.348)" gradientUnits="userSpaceOnUse"><stop offset=".248" stop-color="red"/><stop offset=".864" stop-color="#C20000"/></radialGradient>
                  <radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(10.73016 -6.0481 4.7977 8.51177 9.739 7.47)" gradientUnits="userSpaceOnUse"><stop offset=".248" stop-color="red"/><stop offset="1" stop-color="#C20000"/></radialGradient>
                  <radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="matrix(12.46295 -7.0248 5.57245 9.88628 9.385 8.348)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
                  <radialGradient id="d" cx="0" cy="0" r="1" gradientTransform="rotate(-26.296 35.528 -24.494) scale(10.4431 5.16038)" gradientUnits="userSpaceOnUse"><stop stop-color="#BD2719" stop-opacity=".25"/><stop offset="1" stop-color="#BD2719" stop-opacity="0"/></radialGradient>
                  <radialGradient id="e" cx="0" cy="0" r="1" gradientTransform="matrix(3.44964 -1.37214 .85235 2.14287 7.347 7.195)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
                  <radialGradient id="f" cx="0" cy="0" r="1" gradientTransform="matrix(2.3281 -2.00697 1.24678 1.44628 14.6 6.846)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
                  <linearGradient id="g" x1="13.887" x2="15.658" y1="26.85" y2="2.964" gradientUnits="userSpaceOnUse"><stop stop-color="#860805"/><stop offset="1" stop-color="#BD2719" stop-opacity="0"/></linearGradient>
                </defs></svg></div>);
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
              setDisplayHeader(<div>{highlightsHeader}<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><path fill="#81d4fa" d="M47.63 12.67c19.85 0 34.8 14.95 34.8 34.8s-16.15 36.01-36 36.01-34.8-14.95-34.8-34.8 16.15-36.01 36-36.01" opacity=".6"/><path fill="#616161" d="M47.63 12.67c19.85 0 34.8 14.95 34.8 34.8s-16.15 36.01-36 36.01-34.8-14.95-34.8-34.8 16.15-36.01 36-36.01m-29.61 4.1C-1.66 36.45 8 65.2 15.69 73.05c14.23 14.52 40.83 22.79 60.73 2.88 18.43-18.43 11.81-41.8-1.17-56.09-8.62-9.48-37.56-22.74-57.23-3.07z"/><path fill="#bdbdbd" d="m99.78 90.86-8.33 8.38-19.62-19.8s-1.66-3.19 1.62-6.47c3.28-3.28 6.71-1.91 6.71-1.91l19.62 19.8z"/><path fill="#616161" d="M88.5 76.96c-1.13-.9-5.05-3-9.36 1.28-4.3 4.28-2.55 7.66-1.7 8.91 0 0 30.53 33.87 31.92 35.27 2.05 2.05 6.26.3 10.16-3.6 3.9-3.9 5.78-7.67 3.58-9.87-1.79-1.79-33.47-31.09-34.6-31.99z"/><path fill="#bdbdbd" d="M43.92 8.64c19.85 0 36 16.15 36 36s-16.15 36-36 36-36-16.15-36-36 16.15-36 36-36m0-3.96c-22.06 0-39.95 17.89-39.95 39.95s17.89 39.95 39.95 39.95S83.87 66.7 83.87 44.63 65.98 4.68 43.92 4.68z"/><ellipse cx="117.01" cy="116.31" fill="#424242" rx="9.25" ry="3.56" transform="rotate(-45.001 117.004 116.31)"/><linearGradient id="a" x1="20.385" x2="36.781" y1="18.024" y2="44.616" gradientUnits="userSpaceOnUse"><stop offset=".285" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><path fill="url(#a)" d="M26.52 23.6c-6.52 6.83-9.08 14.39-9.14 22.79-.02 3.09.41 6.36 2.32 8.78 1.91 2.42 5.7 3.57 8.2 1.76 1.66-1.2 2.35-3.29 3.16-5.16 1.24-2.87 2.97-5.54 5.1-7.84 2.66-2.88 5.92-5.18 8.46-8.16 2.54-2.98 4.35-7.01 3.33-10.8-1.01-3.71-4.67-6.33-8.48-6.76s-9.19 1.45-12.95 5.39z"/><path fill="#fff" d="M64.05 75.78c0-.46.22-.88.59-1.15 1.95-1.39 7.2-4.64 11.73-13.28C79 56.31 80 52.11 80.28 50.61c.79-4.24 3.01-2.82 2.7-.08-.36 3.12-3.07 16.85-16.68 26.38-.95.67-2.25.03-2.25-1.13zM26.39 11.39c-.13 1.3-2.34 2.53-2.73 2.78-2.02 1.3-7.02 3.85-11.59 12.47-2.13 4.01-3.66 8.14-4.18 10.19-.85 3.35-3.14 2.68-2.7-.05.5-3.1 3.85-16.69 17.88-25.58.99-.62 3.49-1.53 3.32.19z" opacity=".59"/><linearGradient id="b" x1="58.951" x2="63.085" y1="95.509" y2="52.792" gradientUnits="userSpaceOnUse"><stop offset=".285" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><path fill="url(#b)" d="M55.92 73.93c-4.45.81-5.77-1.05-5.21-2.9.44-1.47 2.08-2.1 3.55-2.54 7.84-2.35 14.46-8.84 19.27-15.28.11 5.59-1.36 8.83-4.05 12.15-2.63 3.23-6.72 7.32-13.56 8.57z"/></svg></div>);
              setDisplayText(highlights);
            }}
          >
            Highlights
          </NavItem>
        </CompNavBarInline>
      )}

      <TarotCard>
        <h2>{displayHeader} </h2>
        <ul>
          <li>{displayText}</li>
        </ul>
      </TarotCard>
    </div>
  );
};

export default Compatibility;
