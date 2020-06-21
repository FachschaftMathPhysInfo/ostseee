import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
  EuiInMemoryTable,
  EuiButton,
  SortDirection,
} from "@elastic/eui";

import { getQueries } from '../lib/store';
import FacultyCreateDialog from './FacultyCreateDialog';

import * as facultyQueryConfigs from '../query-configs/faculties';
import * as facultysSelectors from '../selectors/faculties';
import { Faculty } from 'ostseee-web-common';
import { useHistory } from 'react-router';



const FacultiesOverview = props => {
  useRequest(facultyQueryConfigs.facultiesGet());
  const Faculties = useSelector(facultysSelectors.getFaculties);

  const history = useHistory();

  const columns = [
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Faculty',
      sortable: true,
    },
  ];

  const sorting = {
    sort: {
      field: "name",
      direction: SortDirection.ASC,
    },
  };

  return (
    <>
      <EuiInMemoryTable
        items={Faculties}  // adjust for server request
        columns={columns}
        sorting={sorting}
      />
      
      <EuiButton fill iconType="plusInCircle"  
                onClick={() => history.push("/faculties/new")}>
          Create Faculty
        </EuiButton>
    </>
  );
};

export default FacultiesOverview;