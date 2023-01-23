import React, { useState } from "react";

const CreateProfile = () => {

  const [name, setName] = useState('Jean Valgene');

  const changeName = (e) => {
    setName(prevName => (prevName = e.target.value));
    console.log(name);
  }

  return (
    <div className='create-profile'>
      <h1>Create Your Profile!</h1>
      <div id='create-profile-form-container'>
        <form>
          <input
          placeholder='Name...'
          onChange={(e) => changeName(e)}
          ></input>
          <button className='button'>submit</button>
          <input placeholder='Birthday...'></input>
          <button className='button'>submit</button>
          <input placeholder='Location...'></input>
          <button className='button'>submit</button>
        </form>
      </div>
      <div id='profile-card-container'>
        <span>{name}</span>
      </div>
    </div>
  )
}

export default CreateProfile;