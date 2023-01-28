import React from 'react';
import ReactDOM from 'react-dom/client';
import '../dist/styles.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
// In the event of mystery errors, try putting strict mode back in
  <BrowserRouter>
    <App />
  </BrowserRouter>

);
