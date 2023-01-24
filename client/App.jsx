import React from 'react';
import NavBar from './NavBar.jsx';
import {Route, Routes} from 'react-router-dom';
const App = () => (
  <div>
    <NavBar />
    <a href="/auth/google">Authenticate with Google</a>
    <Routes>
      <Route path="/"></Route>
      <Route path="/faves"></Route>
      <Route path="/scopes"></Route>
      <Route path="/reading"></Route>
      <Route path="/dialog"></Route>
    </Routes>
  </div>
);

export default App; 
