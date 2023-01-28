import React from 'react';
import ReactDOM from 'react-dom/client';
import '../dist/styles.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
//import Astrology from './Astrology.jsx';
//import ProfileCreation from './ProfileCreation.jsx';
// import './styles.css';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);



ReactDOM.createRoot(document.getElementById('app')).render(
// In the event of mystery errors, try putting strict mode back in
  <BrowserRouter>
    <App />
  </BrowserRouter>

);
