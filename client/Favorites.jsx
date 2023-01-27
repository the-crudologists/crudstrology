import React from 'react';
import axios from 'axios';

const Favorites = () => {
  const getAllQuotes = () => {
    axios.get('/api/all_quotes')
      .then((results) => console.log('success'))
      .catch((err) => console.log(err));
  };
  const quotesArray = getAllQuotes();
  return (
    quotesArray.map((quote, i) => {
      return (
        <div>

        </div >
      );

    })
  );
};


export default Favorites;

