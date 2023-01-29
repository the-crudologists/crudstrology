import React, { useState, useEffect } from 'react';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import { QuoteButton } from './Styled.jsx';

const ZenQuote = ({ quote, isActive, onClick }) => {
  const [localIsActive, setLocalIsActive] = useState(isActive);
  useEffect(() => {
    setLocalIsActive(isActive);
  }, [isActive]);
  return (

    <div className='quote'>
      <QuoteButton style={localIsActive || quote.like ? { backgroundColor: 'midnightblue' } : { backgroundColor: 'darkslategrey' }} onClick={onClick}><BsHandThumbsUpFill />
      </QuoteButton>{' '}
      <span>{quote.content} --</span>
      <span>{quote.author}  </span>
    </div>
  );

};

export default ZenQuote;
