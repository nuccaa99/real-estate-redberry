import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { FilterProvider } from './contexts/FilterContext';
import { ModalProvider } from './contexts/ModalContext';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ModalProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ModalProvider>
  </Router>
);
