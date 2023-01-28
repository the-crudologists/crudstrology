import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { UserHoro, TarotCard } from './Styled.jsx';
// import ar00 from '../utils/tarotImgs/ar00.jpg';


const Tarot = () => {

  const [tarot, setTarot] = useState([]);
  // ref

  useEffect(() => {
    axios.get('/api/tarot')
      .then(({ data }) => {
        setTarot(() => [...data]);
        console.log('TAROT data', data[0].name_short);
      })
      .catch((err) =>
        console.log('ERROR in useEffect in Tarot.jsx: ', err));
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
      <div placeholder='{tarot}'>
      </div>
      {/* <div src={`../utils/tarotImgs/${tarot[0].name_short}`}></div> */}
      {/* <div>{tarot[0].name_short}</div> */}
      <div>
        {
          tarot.map((card, i) => {
            return (
              <TarotCard key={i}>
                {/* <img src={import('../utils/tarotImgs/ar00.jpg')}></img> */}
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
