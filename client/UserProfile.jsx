import React, { useContext } from 'react';
import { UserContext } from './App.jsx';


const UserProfile = () => {
  const { dob, setDob, sign, setSign, user } = useContext(UserContext);
  return (
    <div name ="parent">
      {console.log(user, 'This is the user')}
      <h1 className='comp-title'>Welcome to ___ </h1>
    </div>

  );
};




export default UserProfile;
