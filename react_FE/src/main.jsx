import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import './assets/js/jquery.min.js';
import './assets/js/bootstrap.bundle.min.js';
import './assets/plugins/metismenu/js/metisMenu.min.js';

import './assets/css/bootstrap.min.css';
import './assets/plugins/metismenu/css/metisMenu.min.css';
import './assets/css/app.css';
import './assets/css/icons.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
