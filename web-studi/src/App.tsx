import React from 'react';
import logo from './logo.svg';
import {EuiHeader} from '@elastic/eui';
import './App.css';
import { EuiHeaderLogo } from '@elastic/eui';
import store from './lib/store';
function App() {
  return (
    <div className="App">
      <EuiHeader>
      <EuiHeaderLogo iconType="logoKibana"></EuiHeaderLogo>
        
      </EuiHeader>
      {/* <FacultiesOverView
       store={store}></FacultiesOverView> */}
    </div>
  );
}

export default App;
