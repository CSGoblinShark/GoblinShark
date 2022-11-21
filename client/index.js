import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "../output.css";

import styles from './styles.css'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)