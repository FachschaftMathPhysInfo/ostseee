import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
  EuiInMemoryTable,
  EuiButtonIcon,
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
      field: 'title',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Title',
      sortable: true,
    },
    {
      field: 'firstname', 
      name: 'Firstname',
      sortable: true,
    },
    {
      field: 'lastname', 
      name: 'Lastname',
      sortable: true,
    },
    {
      field: 'censored', 
      name: 'censored',
      sortable: true,
    },
    {
      field: 'email', 
      name: 'email',
      sortable: true,
    },
    {
      field: '', 
      name: 'Details',
      render: ()=> {return <EuiButtonIcon iconType="arrowRight"/>}
    },
  ];

  const sorting = {
    sort: {
      field: "lastname",
      direction: "asc",
    },
  };

  return (
    <EuiInMemoryTable
        items={Profs}  // adjust for server request
        columns={columns}
        sorting={sorting}
      />
  );
};

export default ProfOverview;