import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TarotCard } from './Styled.jsx';
import Button from 'react-bootstrap/Button';
// import ar00 from '../utils/tarotImgs/ar00.jpg';

const Tarot = () => {

  const [tarot, setTarot] = useState([]);

  const drawCards = () => {
    axios.get('/db/tarot')
      .then(({ data }) => {
        setTarot(() => [...data]);
        console.log('TAROT data', data[0].name_short);
      })
      .catch((err) =>
        console.log('ERROR in useEffect in Tarot.jsx: ', err));
  };

  useEffect(drawCards, []);

  console.log(tarot);

  return (
    <div>
      <h1 className='horo-title'>Your Reading</h1>
      <div style={{ fontSize: '20px' }}><p><b>Spoiler alert: you're gonna die</b></p></div>
      <Button variant='secondary' onClick={drawCards}>Pull Another Reading</Button>
      <div placeholder='{tarot}'>
      </div>
      {/* <div src={`../utils/tarotImgs/${tarot[0].name_short}`}></div> */}
      {/* <div>{tarot[0].name_short}</div> */}
      <div>
        {
          tarot.map((card, i) => {
            return (
              <TarotCard key={i}>
                {/* <img src={import(`../utils/tarotImgs/${card.name_short}.jpg`)}></img> */}
                <div key={i + 1}>
                  {Object.entries(card).map((el, i) => {
                    return <div style={{ fontSize: '18px' }} key={i}>
                      <b>{el[0]}</b>: <em>{el[1]}</em></div>;
                  })}
                </div>
              </TarotCard>
            );
          })
        }
      </div>
    </div>
  );
};

export default Tarot;

{ /* <img src={import(`../utils/tarotImgs/${card.name_short}.jpg`)}></img> */ }

{ /* <div>
{
  Object.entries(tarot[0]).length > 0 ? <h1>{Object.entries(tarot[0])}</h1> : <h1>{null}</h1>
}
</div> */ }
