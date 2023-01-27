import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Tarot = () => {

  const [tarot, setTarot] = useState({});

  useEffect(() => {
    axios.get('/api/tarot')
      .then(({ data }) =>
        setTarot(data))
      .catch((err) =>
        console.log('ERROR in useEffect in Tarot.jsx: ', err));
  });


  return (
    <div>
      TAROT READING GOES HERE
    </div>
  );
};


export default Tarot;
