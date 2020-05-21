import * as React from 'react';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';

import { getQueries } from '../lib/store';
import FacultiesList from './FacultyList';
import FacultyCreateDialog from './FacultyCreateDialog';

const FacultiesOverView = props => {
  return (
    <Provider store={props.store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <>
          <h1>Faculty Overview</h1>
          <FacultiesList />
          <FacultyCreateDialog></FacultyCreateDialog>
        </>
      </ReduxQueryProvider>
    </Provider>
  );
};

export default FacultiesOverView;