import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';


const Tarot = () => {

  const [tarot, setTarot] = useState({});

  useEffect(() => {
    if (!tarot.length) {
      axios.get('/api/tarot')
        .then(({ data }) =>
          setTarot(data))
        .catch((err) =>
          console.log('ERROR in useEffect in Tarot.jsx: ', err));
    } else {
      return;
    }
  }, []);

  // useLayoutEffect(() => {
  //   axios.get('/api/cards')
  //     .then((status) =>
  //       console.log('status in useLayoutEffect Tarot.jsx: ', status))
  //     .catch((err) =>
  //       console.error('Error in useLayoutEffect Tarot.jsx: ', err))
  // }, []);

  return (
    <div>
      {/* <h1>{tarot[0]}</h1> */}
      {/* <h1>{tarot[1]}</h1> */}
      {/* <h1>{tarot[2]}</h1> */}
    </div>
  );
};


export default Tarot;
