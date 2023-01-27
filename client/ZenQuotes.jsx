import React, { useState, useEffect } from 'react';
import fakeQuotes from '../database/fakeData/quotes.json';
import axios from 'axios';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import ZenQuote from './ZenQuote.jsx';


const ZenQuotes = () => {
  const [quotes, setQuote] = useState([fakeQuotes.results[Math.floor(Math.random() * 20)]]);
  useEffect(() => {
    const getQuote = () => {
      axios.get('/api/quotes')
        .then(quote => {
          setQuote(prevQuote => [quote.data, ...prevQuote]);
        })
        .catch(err => {
          console.log('Axios Get /api/quotes', err);
        });
    };
    //TODO: fix this to only have one quote on render
    //getQuote();///this adds two quotes on render
    const interval = setInterval(() => {
      getQuote();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (

    <div>
      {
        quotes.map((quote, i) => {
          return (
            <ZenQuote
              quote={quote}
              key={i}
            />
          );
        })
      }
    </div>
  );
};

export default ZenQuotes;



