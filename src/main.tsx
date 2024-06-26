import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/sass/common/main.scss';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './utils/ScrollToTop.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
