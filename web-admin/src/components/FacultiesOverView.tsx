import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

import { getQueries } from '../lib/store';
import FacultyCreateDialog from './FacultyCreateDialog';

import * as facultyQueryConfigs from '../query-configs/faculties';
import * as facultysSelectors from '../selectors/faculties';
import { Faculty } from 'ostseee-web-common';

const FacultiesOverview = props => {
  useRequest(facultyQueryConfigs.facultiesGet());
  const Faculties = useSelector(facultysSelectors.getFaculties);

  const columns = [
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Faculty',
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
      <h1>Faculty Overview</h1>
      <EuiBasicTable
        items={Faculties}  // adjust for server request
        columns={columns}
      />
      <FacultyCreateDialog></FacultyCreateDialog>
    </>
  );
};

export default FacultiesOverview;