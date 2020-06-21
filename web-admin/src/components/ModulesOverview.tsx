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

import * as moduleQueryConfigs from '../query-configs/modules';
import * as moduleSelectors from '../selectors/modules';
import { Module } from 'ostseee-web-common';

const ModulesOverview = props => {
  useRequest(moduleQueryConfigs.modulesGet());
  const Modules = useSelector(moduleSelectors.getModules);

  const columns = [
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Module Name',
      sortable: true,
    },
    {
      field: 'description', 
      name: 'Description',
      truncateText: true,
    },
    {
      field: '', 
      name: 'Details',
      render: ()=> {return <EuiButtonIcon iconType="arrowRight"/>}
    },
  ];

  const sorting = {
    sort: {
      field: "name",
      direction: "asc",
    },
  };

  return (
    <>
      <EuiInMemoryTable
        items={Modules}  // adjust for server request
        columns={columns}
        sorting = {sorting}
      />
    </>
  );
};

export default ModulesOverview;