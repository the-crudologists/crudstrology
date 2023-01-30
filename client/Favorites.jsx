import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHandThumbsDownFill } from 'react-icons/bs';
import { DeleteButton } from './Styled.jsx';
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
      <h1 className='horo-title'>Favorites</h1>
      <div style={{ fontSize: '20px' }}><b><p>Unlike to remove</p></b></div>
      {quotes.flat().map((quote, i) => {
        return (
          <div className='quote' key={i}>
            <DeleteButton onClick={() => { deleteQuote(quote.id); }}><BsHandThumbsDownFill /></DeleteButton>{' '}
            <span >{quote.content} --</span>
            <span>{quote.author}  </span>
          </div>
        );
      })
      }
    </div >

  );

};

export default Favorites;
