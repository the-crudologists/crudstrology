import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';


const ZenQuote = ({ quote, isActive, onClick }) => {
  const [localIsActive, setLocalIsActive] = useState(isActive);
  useEffect(() => {
    setLocalIsActive(isActive);
  }, [isActive]);
  return (

    <div className='quote'>
      <Button style={localIsActive || quote.like ? { backgroundColor: 'midnightblue' } : { backgroundColor: 'darkslategrey' }} onClick={onClick}><BsHandThumbsUpFill />
      </Button>{' '}
      <span>{quote.content} --</span>
      <span>{quote.author}  </span>
    </div>
  );

};

export default ZenQuote;
