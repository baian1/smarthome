import * as React from 'react';
import { render } from 'react-dom';
import { App } from './APP'
import './index.less'
import { BrowserRouter } from "react-router-dom"

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.querySelector('#root'));