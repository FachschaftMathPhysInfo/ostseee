import React from 'react';
import logo from './logo.svg';
import {EuiHeader} from '@elastic/eui';
import './App.css';
import { EuiHeaderLogo } from '@elastic/eui';
import FormsOverView from './components/FormsOverView';
import store from './lib/store';
function App() {
  return (
    <div className="App">
      <EuiHeader>
      <EuiHeaderLogo iconType="logoKibana"></EuiHeaderLogo>
        
      </EuiHeader>
      <FormsOverView store={store}></FormsOverView>
    </div>
  );
}

export default App;
