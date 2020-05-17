import * as React from 'react';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';

import FormsList from '../components/FormsList';
import { getQueries } from '../lib/store';

const FormsOverView = props => {
  return (
    <Provider store={props.store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <>
          <h1>Forms Overview</h1>
          <FormsList />
        </>
      </ReduxQueryProvider>
    </Provider>
  );
};

export default FormsOverView;