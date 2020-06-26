import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiButton,
  EuiSpacer,
  EuiText,
  EuiInMemoryTable,
  SortDirection,
  EuiTableDataType,
} from "@elastic/eui";

import { getQueries } from '../lib/store';

import * as termQueryConfigs from '../query-configs/terms';
import * as termSelectors from '../selectors/terms';
import { Term } from 'ostseee-web-common';
import { useState } from 'react';
import { useHistory } from 'react-router';

const TermsOverview = props => {
  useRequest(termQueryConfigs.termsGet());
  const Terms = useSelector(termSelectors.getTerms);
  const history = useHistory();

  const columns = [
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Term name',
      dataType: 'string' as EuiTableDataType,
      sortable: true,
    },
    {
      field: 'begin', 
      name: 'Begin date',
      sortable: true,
      dataType: 'date'as EuiTableDataType,
      render: date => { return date.toLocaleDateString('de-DE') },
    },
    {
      field: 'end', 
      name: 'End date',
      sortable: true,
      dataType: 'date' as EuiTableDataType,
      render: date => { return (date.toLocaleDateString('de-DE')) },
    },
  ];

  const sorting = {
    sort: {
      field: "begin",
      direction: SortDirection.DESC,
    },
  };

  const getRowProps = (item) => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => history.push("/terms/"+id),
    };
  };
  
  return (
    <>
      <EuiButton fill iconType="plusInCircle"  
                onClick={() => history.push("/terms/new")}>
          Semester neu anlegen
      </EuiButton>   
      <EuiInMemoryTable
        items={Terms}  // adjust for server request
        columns={columns}
        sorting={sorting}
        rowProps={getRowProps}
      />
    </>
  );
};

export default TermsOverview;