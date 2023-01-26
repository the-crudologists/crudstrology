import React, { useState, useEffect } from 'react';
//import fakeQuotes from '../database/fakeData/quotes.json';
import axios from 'axios';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';


const ZenQuotes = () => {
  const [quotes, setQuote] = useState([]);
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
    const interval = setInterval(() => {
      getQuote();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (

    <div>
      {quotes.map((quote, i) =>
        <div key={i} className='quote'>
          <span>{quote.content}</span>
          <span> -{quote.author}  </span>
          <Button variant="primary"><BsHandThumbsUpFill /></Button>{' '}
        </div>
      )}
    </div>);
};

export default ZenQuotes;



