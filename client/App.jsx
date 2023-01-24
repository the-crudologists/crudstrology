import React from 'react';
import NavBar from './NavBar.jsx';
import Astrology from './Astrology.jsx';
import Feed from './Feed.jsx';
import Tarot from './Tarot.jsx';
import Favorites from './Favorites.jsx';
import { Route, Routes } from 'react-router-dom';
const App = () => (
  <>
    <div>
      <NavBar />
      <a href="/auth/google">Authenticate with Google</a>

    </div>
    <div>
      <Routes>
        <Route path="/" element={<Feed />}/>
        <Route path="/astrology" element={<Astrology />}/>
        <Route path="/tarot" element={<Tarot />}/>
        <Route path="/favorites" element={<Favorites />}/>
        {/* <Route path="/dialog" element={<Feed />}/> */}
      </Routes>
    </div>
  </>
);

export default App; 
