import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

import { getQueries } from '../lib/store';

import * as termQueryConfigs from '../query-configs/terms';
import * as termSelectors from '../selectors/terms';
import { Term } from 'ostseee-web-common';

const TermsOverview = props => {
  useRequest(termQueryConfigs.termsGet());
  const Terms = useSelector(termSelectors.getTerms);

  const columns = [
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Prof',
      sortable: true,
    },
    {
      field: 'course', 
      name: 'Course',
      truncateText: true,
    },
  ];

  return (
    <>
      <h1>Prof Overview</h1>
      <EuiBasicTable
        items={Terms}  // adjust for server request
        columns={columns}
      />
    </>
  );
};

export default TermsOverview;