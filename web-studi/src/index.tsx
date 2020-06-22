import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import '@elastic/eui/dist/eui_theme_light.css';
import './themes/ruperto/ruperto.scss'
//@ts-ignore
import styled, { ThemeProvider } from 'styled-components';
import * as euiVars from '@elastic/eui/dist/eui_theme_light.json';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import { BrowserRouter as Router } from 'react-router-dom';
import store, { getQueries } from './lib/store';
let theme = euiVars;
theme.default.euiColorPrimary= "#990000"
theme.default.euiColorPrimaryText="#990000"
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
        <ReduxQueryProvider queriesSelector={getQueries}>
      <Router>
      <App></App>
      </Router>
      </ReduxQueryProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
