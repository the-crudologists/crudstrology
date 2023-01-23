import React, { useState } from "react";
import fakeHoro from '../database/fakeData/horoscope.json'

const Horoscope = () => {

  const [reading, setReading] = useState(fakeHoro);

  return (
    <div className='horoscope'>
      <h1 className='horo-title'>Your Daily Horoscope</h1>
      <div id='horo-item' className='container'>{ reading.description }</div>
    </div>
  )
}

export default Horoscope;