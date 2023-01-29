import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZenQuote from './ZenQuote.jsx';

const ZenQuotes = () => {

  const [quotes, setQuote] = useState([]);
  const [activeButton, setActiveButton] = useState({});

  const likeQuote = (quote) => {
    axios.post('/db/quote', {
      quote: {
        content: quote.content,
        author: quote.author
      }
    }).then(() => 
      quote.like = true
    )
      .catch((err) => console.error(err));
  };
  const handleClick = (index, quote) => {
    likeQuote(quote);
    setActiveButton({ [index]: !activeButton[index] });
  };

  useEffect(() => {
    const getQuote = () => {
      axios.get('/api/quotes')
        .then(quote => {
          setQuote(prevQuote => [quote.data, ...prevQuote]);
        })
        .catch(err => {
          console.log('Axios Get /db/quotes', err);
        });
    };

    getQuote();

    const interval = setInterval(() => {
      getQuote();
      setActiveButton({});
    }, 5000);
  }, []);

  return (

    <div>
      {
        quotes.map((quote, index) => {

          return (
            <ZenQuote
              key={index}
              quote={quote}
              isActive={activeButton[index]}
              onClick={() => { handleClick(index, quote); }}
            />
          );
        })
      }
    </div>
  );
};

export default ZenQuotes;
