import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar.jsx';
import Astrology from './Astrology.jsx';
import Feed from './Feed.jsx';
import Tarot from './Tarot.jsx';
import Compatibility from './ Compatibility.jsx';
import Favorites from './Favorites.jsx';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Journal from './Journal Component/Journal.jsx';


export const UserContext = React.createContext();

const App = () => {

  const [user, setUser] = useState();
  const [dob, setDob] = useState();
  const [sign, setSign] = useState();

  // this will append all USER state information (name, DOB, sign)
  useEffect(() => {
    axios.get('/auth/user')
      .then(({ data }) => {
        console.log(data);
        setUser(data[0].name);
        setDob(data[0].dob); // May be null on initialization need logic in sub components accordingly
        setSign(data[0].sign); //see above comment^
      })
      .catch(err => {
        console.log('Error fetching Authenticated Google User from req.user (server/passport)', err);
      });
  }, []);


  return (
    <>
      <UserContext.Provider value={{ user, dob, setDob, sign, setSign }}>
        <div>
          <NavBar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
