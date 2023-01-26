import React, { useState, useEffect } from 'react';
//import fakeQuotes from '../database/fakeData/quotes.json';
import axios from 'axios';



const ZenQuotes = () => {
  const [quotes, setQuote] = useState([]);
  const getQuote = () => {
    axios.get('/api/quotes')
      .then(quote => {
        setQuote(prevQuote => [quote.data, ...prevQuote]);
      })
      .catch(err => {
        console.log('Axios Get /api/quotes', err);
      });
  };

  useEffect(() => {
    setInterval(() => {
      getQuote();
    }, 60000);
  }, []);

  return (
    <div>
      {quotes.map((quote, i) =>
        <div key={i}>
          <span>{quote.content}</span>
          <span> -{quote.author}</span>
        </div>
      )
      }
    </div>);
};

export default ZenQuotes;



