import React from "react";

const CreateProfile = () => {
  return (
    <div className='create-profile'>
      <h1>Create Your Profile!</h1>
      <div id='create-profile-form-container'>
        <form>
          <input placeholder='Name...'></input>
          <button>submit</button>
          <input placeholder='Birthday...'></input>
          <button>submit</button>
          <input placeholder='Location...'></input>
          <button>submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProfile;