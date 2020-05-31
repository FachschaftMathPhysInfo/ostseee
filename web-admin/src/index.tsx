import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@elastic/eui/dist/eui_theme_light.css';
//@ts-ignore
import styled, { ThemeProvider } from 'styled-components';
import * as euiVars from '@elastic/eui/dist/eui_theme_light.json';
import FormsOverView from './components/FormsOverView';
import store from './lib/store';
import FacultiesOverView from './components/FacultiesOverView';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={euiVars}>
    <App store={store}></App>
    {/* <FacultiesOverView
       store={store}></FacultiesOverView> */}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
