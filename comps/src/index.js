
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { NavigationProvider } from './context/NavigationContext';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

root.render(
<NavigationProvider><App /></NavigationProvider>
);

