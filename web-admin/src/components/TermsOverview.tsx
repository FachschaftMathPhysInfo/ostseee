import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
  EuiInMemoryTable,
} from "@elastic/eui";

import { getQueries } from '../lib/store';

import * as termQueryConfigs from '../query-configs/terms';
import * as termSelectors from '../selectors/terms';
import { Term } from 'ostseee-web-common';
import { useState } from 'react';

const TermsOverview = props => {
  useRequest(termQueryConfigs.termsGet());
  const Terms = useSelector(termSelectors.getTerms);

  const [sortField, setSortField] = useState('begin');
  const [sortDirection, setSortDirection] = useState('desc');

  const columns = [
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Term name',
      sortable: true,
    },
    {
      field: 'begin', 
      name: 'Begin date',
      sortable: true,
      dataType: 'date',
      render: date => { return date.toLocaleDateString('de-DE') },
    },
    {
      field: 'end', 
      name: 'End date',
      sortable: true,
      dataType: 'date',
      render: date => { return date.toLocaleDateString('de-DE') },
    },
  ];

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };
  
  return (
      <EuiInMemoryTable
        items={Terms}  // adjust for server request
        columns={columns}
        sorting={sorting}
      />
    
  );
};

export default TermsOverview;