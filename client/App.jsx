import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar.jsx';
import Astrology from './Astrology.jsx';
import Feed from './Feed.jsx';
import Tarot from './Tarot.jsx';
import Favorites from './Favorites.jsx';
import { Route, Routes } from 'react-router-dom';

import axios from 'axios';

export const UserContext = React.createContext();

const App = () => {

  const [user, setUser] = useState();

  // this will append all USER state information (name, DOB, sign)
  useEffect(() => {
    axios.get('/auth/user')
      .then(user => {
        setUser(user.data.name);
      })
      .catch(err => {
        console.log('Error fetching Authenticated Google User from req.user (server/passport)', err);
      });
  });

  console.log('STATE UPDATE', user);

  return (
  <>
    <UserContext.Provider value={user}>
      <div>
        <NavBar />
        <a href="/auth/google">Authenticate with Google</a>
      </div>
      {/* <div onClick={fetchUser}>setUse State Call</div> */}
      <div>
        <Routes>
          <Route path="/" element={<Feed />}/>
          <Route path="/astrology" element={<Astrology />}/>
          <Route path="/tarot" element={<Tarot />}/>
          <Route path="/favorites" element={<Favorites />}/>
          {/* <Route path="/dialog" element={<Feed />}/> */}
        </Routes>
      </div>
    </UserContext.Provider>
  </>
  )
};

export default App; 



  // <-- if we want to fetch user/username with Event Listener -->
  // const fetchUser = () => {
  //   axios.get('/auth/user')
  //     .then(user => {
  //       console.log('USER FROM AXIOS', user.data.name);
  //       setUser(user.data.name);
  //     })
  //     .catch(err => {
  //       console.log('Error fetching Authenticated Google User from req.user (server/passport)', err);
  //     });
  // };
