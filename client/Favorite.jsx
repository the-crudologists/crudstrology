import React from 'react';
import axios from 'axios';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';

const Favorite = (quote) => {
  //console.log(quote.quote);//array of objects
  return (


    <div className='quote'>

      <span>{quote.quote.content} --</span>
      <span>{quote.quote.author}  </span>
      <Button variant="primary" onClick={() => { likeQuote(quote.quote); }}><BsHandThumbsUpFill /></Button>{' '}
    </div>


  );
};

export default Favorite;

