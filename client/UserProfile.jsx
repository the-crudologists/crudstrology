import React, {useState, useEffect, useContext} from 'react';
import {Link, useLocation } from 'react-router-dom';
import {ProfileImg, AstroButton} from './Styled.jsx';
import { UserContext } from './App.jsx';



const UserProfile = () => {
    const { state } = useLocation();
    const { dob, setDob, sign, setSign, user } = useContext(UserContext);
    const [followButton,  setFollowButton] = useState('')


    // Disabling follow button if user is on their own profile
    useEffect(() => {
        if (state.name === user) {
            // Sets the state to display that the user is on their own profile
            setFollowButton(<AstroButton style={{color: 'black', margin: 'auto', padding: '10px', backgroundColor: 'green' }} disabled>You</AstroButton>);
        } else {
        setFollowButton(<AstroButton style={{color: 'black', margin: 'auto', padding: '10px'}}>Follow</AstroButton>);
        }
    })




    return (
        <div name="parent">
     <div style={{ display: 'inline-block', 'border-style': 'solid', maxHeight: '100%'}}>
             <ProfileImg src={`https://robohash.org/${state.name}?set=set5`} />
            <div name="user-info" style={{textAlign: 'center'}}><h1 className='comp-title'>{state.name}</h1>
            {followButton}
            <h2 className='comp-sign'>{state.sign}</h2>
             <h2 className='comp-sign'>{state.dob}</h2>
             </div>
             </div>
             <Link to="/">Go Back</Link>
             </div>


  );
};




export default UserProfile;
