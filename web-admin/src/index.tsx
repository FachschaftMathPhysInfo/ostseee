import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
//@ts-ignore
import styled, { ThemeProvider } from 'styled-components';
import * as euiVars from '@elastic/eui/dist/eui_theme_dark.json';
import store, { getQueries } from './lib/store';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect, useParams } from 'react-router';
import { getSession } from './lib/session';
import { LoginPage } from './components/LoginPage';

const InnerDisplay = props => {
  const { path } = useParams()
  console.log(path)
  return 
}

ReactDOM.render(
  <React.StrictMode>

    <ThemeProvider theme={euiVars}>
      <Provider store={store}>
        <ReduxQueryProvider queriesSelector={getQueries}>
          <Router >
            <Route path="/" render={(props)=>{return (getSession() ? (<App store={store}></App>) : (<LoginPage loc={props.location.pathname}></LoginPage>))}} ></Route>
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
