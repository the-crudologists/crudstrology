import React, { useState } from 'react';

const CreateProfile = () => {

  const [name, setName] = useState('Jean Valjean');

  const changeName = (e) => {
    setName(prevName => (prevName = e.target.value));
    console.log(name);
  };

  return (
    <div className='create-profile'>
      <h1>Create Your Profile!</h1>
      <div id='create-profile-form-container'>
        <form>
          <input className='text' placeholder='Name...' onChange={(e) => changeName(e)}></input>
          <button className='text'>submit</button>
          <input className='text' placeholder='Birthday...'></input>
          <button className='text'>submit</button>
          <input className='text' placeholder='Location...'></input>
          <button className='text'>submit</button>
        </form>
      </div>
      <div id='profile-card-container'>
        <div style={{padding: '15px'}}>
          <span><b className='text'>Name: </b></span>
          <span className='text' id='profile-card-name'>{name}</span>
        </div>
        <p></p>
        <div style={{padding: '15px'}}>
          <span> <b className='text'>Birthday: </b></span>
        </div>
        <p></p>
        <div style={{padding: '15px'}}>
          <span> <b className='text'>Location: </b></span>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
