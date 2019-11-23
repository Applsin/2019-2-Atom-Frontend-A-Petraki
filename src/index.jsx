import React from 'react';
import { render } from 'react-dom';
import './styles/globalStyles.css';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './utils/serviceWorker';
import { WrapForm } from './components/WrapForm'

render(
  <BrowserRouter>
    <Route path='/' component={WrapForm} />
  </BrowserRouter>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
