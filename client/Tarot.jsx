import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TarotCard, Reading } from './Styled.jsx';
import Button from 'react-bootstrap/Button';
import TarotDeck from '../utils/tarot-images.json';
// import ar00 from '../utils/tarotImgs/ar00.jpg';

const Tarot = () => {

  const [tarot, setTarot] = useState([]);
  const [fortune, setFortune] = useState([]);

  const drawCards = () => {
    setFortune([]);
    axios.get('/db/tarot')
      .then(({ data }) => {
        setTarot(() => [...data]);
        data.forEach((drawnCard, i) => {
          // console.log('FIRST forEach, drawnCard', drawnCard);
          TarotDeck.cards.forEach((deckCard) => {
            if (deckCard.name === drawnCard.name) {
              setFortune(prevFortune => [...prevFortune, deckCard.fortune_telling[i]]); // change to [i]
              return;
            }
          });
        });
      })
      .catch((err) =>
        console.log('ERROR in useEffect in Tarot.jsx: ', err));
  };

  useEffect(drawCards, []);
  return (
    <div>
      <h1 className='horo-title'>Tarot Reading</h1>
      <div style={{ fontSize: '20px' }}><b><p>Your fate will be told...</p></b></div>
      <p></p>
      <Button variant='secondary' onClick={drawCards}>Pull Another Reading</Button>
      <p></p>
      <Reading> <b>The interpretation of your reading...
        Past: {tarot.length > 0 && <u>{tarot[0].name}</u>},
        Present: {tarot.length > 0 && <u>{tarot[1].name}</u>},
        Future: {tarot.length > 0 && <u>{tarot[2].name}</u>}</b>
      <div>{fortune.map((el, i) => <span key={i}><i>{el}. </i></span>)}</div>
      </Reading>
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
                      <b>{el[0] === 'desc' ? <u>{el[0]}</u> : el[0]}: </b>
                      {el[0] === 'desc' ? <b>{el[1]}</b> : <em>{el[1]}</em>}</div>;
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
