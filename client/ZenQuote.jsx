import React from 'react';
import axios from 'axios';
//import fakeQuotes from '../database/fakeData/quotes.json';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';

const ZenQuote = (quote) => {
  //quote is added to database when liked
  const likeQuote = () => {
    //axios request to put the quote in the db
    axios.post('/api/quote', {
      quote: {
        content: quote.quote.content,
        author: quote.quote.author
      }
    }).then(() => console.log('post successful'))
      .catch((err) => console.error(err));
  };
  //create a click handler function that fires axios request


  return (

    <div className='quote'>
      <span>{quote.quote.content} --</span>
      <span>{quote.quote.author}  </span>
      <Button variant="primary" onClick={() => { likeQuote(quote.quote); }}><BsHandThumbsUpFill /></Button>{' '}


    </div>
  );

};

export default ZenQuote;

