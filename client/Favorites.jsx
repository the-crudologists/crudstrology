import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';

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

  const deleteQuote = (id) => {
    axios.delete(`/db/quotes/${id}`)
      .then(() => {
        axios.get('/db/all_quotes')
          .then(quotesObj => {
            setQuotes(quotesObj.data);
          })
          .catch(err => {
            console.log('Axios Get /db/quotes', err);
          });
      })
      .catch((error) => {
        console.log('axios DELETE', error);
      });
  };
  return (
    <div>
      {quotes.flat().map((quote, i) => {
        return (
          <div className='quote' key={i}>
            <span>{quote.content} --</span>
            <span>{quote.author}  </span>
            <Button variant="primary" onClick={() => { deleteQuote(quote.id); }}><BsHandThumbsUpFill /></Button>{' '}
          </div>
        );
      })
      }
    </div >
  );

};

export default Favorites;
