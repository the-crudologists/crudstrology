import styled, { keyframes } from 'styled-components';

const NavStyle = styled.div`
  background-color: darkslategrey;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
  align-items: center;`;

const WrapCardText = styled.p`
  word-break: break-all;
    white-space: normal;
`;

const NavItem = styled.div`
  font-size: 1.5rem;
  text-align: center;
  flex: 1 1;
  margin: 1rem;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;`;


const NavUserInfo = styled.div`
  font-size: 1rem;
  flex: 1 1;
  min-height: 206px;
  max-height: 206px;
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
  border: .15rem groove azure;
  margin: .6rem;
  padding: .5rem;
`;

export { NavStyle, NavItem, NavUserInfo, NavImg, AstroButton, UserHoro, OtherHoros, TarotCard, WrapCardText };
