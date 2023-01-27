import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Favorite from './Favorite.jsx';

const Favorites = () => {
  const [quotes, setQuote] = useState([]);
  useEffect(() => {
    const getAllQuotes = () => {
      axios.get('/api/all_quotes')
        .then(quote => {
          setQuote(prevQuote => [quote.data, ...prevQuote]);
        })
        .catch(err => {
          console.log('Axios Get /api/quotes', err);
        });
    };
    getAllQuotes();
  }, []);
  //console.log(quotes);
  return (
    <div>
      {quotes.map((quote, i) => {
        return (
          <Favorite quote={quote}
            key={i} />
        );
      })
      }
    </div >
  );


};


export default Favorites;

