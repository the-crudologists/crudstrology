import styled from 'styled-components';

const QuoteButton = styled.button`
  cursor: pointer;
  border: .2rem solid;
  border-color: azure;
  padding: .5rem;
  align-self: center;
  transition: all 0.3s;
  &:hover {
    border-color: #8a04dd;
    box-shadow: .1rem .1rem .1rem .1rem  #5d0593;
    transform: scale(.8);
  }
`;



const DeleteButton = styled.button`
  cursor: pointer;
  border: .2rem solid;
  background-color: darkslategrey;
  border-color: azure;
  padding: .5rem;
  align-self: center;
  transition: all 0.3s;
  &:hover {
    background-color: #cc0000;
    border-color: #520000;
    box-shadow:  #7e0015;
    transform: scale(.9);
  }
`;


const NavStyle = styled.div`
display: block;
color: midnightblue;
padding: 40px;
margin: -10px 0;
border-top: 10px solid midnightblue;
border-bottom: 10px solid midnightblue;
  background-color: darkslategrey;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
  align-items: center;`;

const WrapCardText = styled.p`
  word-break: break-all;
  white-space: normal;
  display: block;
  max-height: 21px;
`;

const NavItem = styled.div`
background-color: midnightblue;
border: .9rem solid midnightblue;
position: relative;
  font-size: 1.5rem;
  text-align: center;
  flex: 1 1;
  margin: 1rem;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
  &:hover {
    border-color: #8a04dd;
    color: #8a04dd;
    box-shadow: .05rem .05rem .05rem .05rem  #5d0593;
    transform: scale(.95);
  }`;


const NavUserInfo = styled.div`
  font-size: 1rem;
  flex: 1 1;
  display: block;
  min-height: 206px;
  max-height: 206px;
  min-width: 275px;
  width: 100%;
  padding: 3rem;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
  border: 1px solid azure;
  `;

const NavImg = styled.img`

  width: 100%;
  margin-top: .3rem;
  height: auto;
  border: 1px solid azure;
  background-color: black;
`;

const AstroButton = styled.button`
  display: flex;
  font-size: 1rem;
  align-items: center;
  padding: .1rem;
  cursor: pointer;`;

const UserHoro = styled.div`
  object-fit: cover;
  border: 3px groove azure;
  background-color: black;
  margin-top: 20px;
  margin-left: 5px;
  font-size: 20px;
  padding: 10px;`;

const OtherHoros = styled.div`
  object-fit: cover;
  border: 3px double azure;
  background-color: rgb(60,60,60);
  margin-top: 10px;
  margin-left: 5px;
  font-size: 14px;
  padding: 10px;`;

const TarotCard = styled.div`
  background-color: black;
  border: .15rem groove azure;
  margin: .6rem;
  padding: .5rem;
`;

const Reading = styled.div`
  background-color: grey;
  border: .4rem double white;
  margin: .6rem;
  padding: .5rem;
`;

export { NavStyle, NavItem, NavUserInfo, NavImg, AstroButton, UserHoro, OtherHoros, TarotCard, WrapCardText, Reading, QuoteButton, DeleteButton };
