import React from 'react';
import fakeQuotes from '../database/fakeData/quotes.json';


const ZenQuotes = () => {
//https://api.quotable.io/quotes?page=1
  return (
    <div>
      <span>{fakeQuotes.results[0].content}</span>
      <span>{fakeQuotes.results[0].author}</span>

    </div>
  );
};

export default ZenQuotes;



//axios request to server
//return quotes that automatically populate the feed on an interval
//create an array of quotes(objects) that can be 'mapped' on interval
