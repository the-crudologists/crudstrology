import React from 'react';
import {Link, useLocation } from 'react-router-dom'



const UserProfile = () => {
    const { state } = useLocation();
    console.log(state.name)
    console.log(useLocation())
    return (
        <div name ="parent">
             <img src={`https://robohash.org/${state.name}?set=set5`} />
            <div><h1 className='comp-title'>{state.name}</h1>
             <h1 className='comp-sign'>{state.dob}</h1>
             <h1 className='comp-sign'>{state.sign}</h1>
             </div> 
             <Link to="/">Go Back</Link>


        </div>

    );
}




export default UserProfile;