import React from 'react';
import NavBar from './NavBar.jsx';
import {Route, Routes} from 'react-router-dom';
const App = () => (
  <div>
    <NavBar />
    <a href="/auth/google">Authenticate with Google</a>
  </div>
);

export default App; 
