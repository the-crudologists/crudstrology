import styled, { keyframes } from 'styled-components';

const NavStyle = styled.div`
  background-color: darkslategrey;
  display: flex;
  justify-content: space-between;
  flex-basis: auto;`;

const NavUl = styled.div`
  font-size: 24px;
  padding: 10px;
  margin: 20px;
  margin-right: 100px;
  display: flex;
  flex-basis: auto;
  gap: 150px;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;`;

const NavUserInfo = styled.div`
  font-size: 20px;
  padding-top: 62px;
  padding-bottom: 62px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: auto;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
  border: 1px solid azure;
  margin-top: 10px;
  margin-bottom: 10px;`;

const NavImg = styled.img`
  object-fit: cover;
  border: 1px solid azure;
  background-color: black;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 5px;`;

const AstroButton = styled.button`
  position: absolute;
  left: 247px;
  top: 333px;
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

export { NavStyle, NavUl, NavUserInfo, NavImg, AstroButton, UserHoro, OtherHoros };
