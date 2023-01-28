import React from 'react';
import axios from 'axios';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';

const ZenQuote = (quote) => {
  const likeQuote = () => {
    axios.post('/db/quote', {
      quote: {
        content: quote.quote.content,
        author: quote.quote.author
      }
    }).then(() => console.log('post successful'))
      .catch((err) => console.error(err));
  };

  return (

    <div className='quote'>
      <span>{quote.quote.content} --</span>
      <span>{quote.quote.author}  </span>
      <Button variant="primary" onClick={() => { likeQuote(quote.quote); }}><BsHandThumbsUpFill /></Button>{' '}
    </div>
  );

};

export default ZenQuote;
