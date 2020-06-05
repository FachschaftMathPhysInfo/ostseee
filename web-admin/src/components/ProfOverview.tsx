import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

import { getQueries } from '../lib/store';

import * as profQueryConfigs from '../query-configs/profs';
import * as profSelectors from '../selectors/profs';
import { Prof } from 'ostseee-web-common';

const ProfOverview = props => {
  useRequest(profQueryConfigs.profsGet());
  const Profs = useSelector(profSelectors.getProfs);

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
        items={Profs}  // adjust for server request
        columns={columns}
      />
    </>
  );
};

export default ProfOverview;