import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import './styles.css';


const appRoot = document.getElementById('app');
const root = createRoot(appRoot);
root.render(<App />);