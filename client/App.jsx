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
  const [dob, setDob] = useState();
  const [sign, setSign] = useState();

  // this will append all USER state information (name, DOB, sign)
  useEffect(() => {
    axios.get('/auth/user')
      .then(user => {
        setUser(user.data.name);
        setDob(user.data.dob); // May be null on initialization need logic in sub components accordingly
        setSign(user.data.sign); //see above comment^
      })
      .catch(err => {
        console.log('Error fetching Authenticated Google User from req.user (server/passport)', err);
      });
  }, []);


  return (
    <>
      <UserContext.Provider value={ {user, dob, setDob, sign, setSign} }>
        <div>
          <NavBar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
