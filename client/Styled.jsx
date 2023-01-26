import styled from 'styled-components';

const Title = styled.h1`
  color: red;`;


const Nav = styled.div`
  background-color: darkslategrey;
  display: flex;
  justify-content: space-between;
  width: fit-content;
  flex-basis: auto;`;

const NavUl = styled.div`
  font-size: 24px;
  padding: 10px;
  margin: 20px;
  display: flex;
  flex-basis: auto;
  gap: 75px;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;`;

const NavUserInfo = styled.div`
  font-size: 20px;
  padding-top: 66px;
  padding-left: 10px;
  padding-right: 10px;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
  border: 1px solid azure;
  margin-top: 5px;
  margin-bottom: 5px;`;

const NavImg = styled.div`
  object-fit: cover;
  border: 1px solid azure;
  background-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;`;

export { Nav, Title, NavUl, NavUserInfo, NavImg };