import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Favorite from './Favorite.jsx';

const Favorites = () => {

  const [quotes, setQuotes] = useState([]);
  const getAllQuotes = () => {
    axios.get('/db/all_quotes')
      .then(quotesObj => {
        setQuotes(prevQuotes => [...prevQuotes, quotesObj.data]);
      })
      .catch(err => {
        console.log('Axios Get /db/quotes', err);
      });
  };
  useEffect(() => {
    getAllQuotes();
  }, []);
  console.log('flat', quotes.flat());

  return (
    <div>
      {quotes.flat().map((quote, i) => {
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

