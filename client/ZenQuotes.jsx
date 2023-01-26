import React from 'react';
import fakeQuotes from '../database/fakeData/quotes.json';
import axios from 'axios';


const ZenQuotes = () => {
  //https://api.quotable.io/quotes?page=1
  //create an axios request to fetch quotes from server/api
  //use react useEffect hook 
  //two args: anonymous function and [];
  // Similar to componentDidMount and componentDidUpdate:

  let quote;
  const getQuote = () => {
    //set interval function to fire an axios 
    axios.get('/api/quotes')
      .then((quote ) => {
        console.log(quote.data);
        quote = quote;
      })
      .catch((err) => {
        console.err('Axios Get /api/quotes', err);
      });
  
  };
  getQuote();
  console.log(quote);
  return (
    // map over state array
    <div>
      <span>{quote}</span>
      <span>{quote}</span>

    </div>
  );
};

export default ZenQuotes;



//axios request to server
//return quotes that automatically populate the feed on an interval
//create an array of quotes(objects) that can be 'mapped' on interval
