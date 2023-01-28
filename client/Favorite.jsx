// import React from 'react';
// import axios from 'axios';
// import { BsHandThumbsUpFill } from 'react-icons/bs';
// import Button from 'react-bootstrap/Button';


// const Favorite = (quote, getAllQuotes) => {

//   const deleteQuote = () => {
//     axios.delete(`/db/quotes/${quote.quote.id}`)
//       .then(getAllQuotes)
//       .catch((error) => {
//         console.log('axios DELETE', error);
//       });
//   };

//   return (

//     <div className='quote'>
//       <span>{quote.quote.content} --</span>
//       <span>{quote.quote.author}  </span>
//       <Button variant="primary" onClick={() => { deleteQuote(quote.quote); }}><BsHandThumbsUpFill /></Button>{' '}
//     </div>
//   );
// };

// export default Favorite;

