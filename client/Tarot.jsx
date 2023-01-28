import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';


const Tarot = () => {

  const [tarot, setTarot] = useState([]);
  // ref

  useEffect(() => {
    if (!tarot.length) {
      axios.get('/api/tarot')
        .then(({ data }) =>
          setTarot(JSON.stringify(data)))
        .catch((err) =>
          console.log('ERROR in useEffect in Tarot.jsx: ', err));
    }
  }, []);
  console.log(tarot);
  // useLayoutEffect(() => {
  //   axios.get('/api/cards')
  //     .then((status) =>
  //       console.log('status in useLayoutEffect Tarot.jsx: ', status))
  //     .catch((err) =>
  //       console.error('Error in useLayoutEffect Tarot.jsx: ', err))
  // }, []);
  return (
    <div>
      {tarot}
    </div>
  );
};


export default Tarot;
