import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
  EuiInMemoryTable,
  EuiButtonIcon,
  SortDirection,
} from "@elastic/eui";

import { getQueries } from '../lib/store';

import * as courseQueryConfigs from '../query-configs/courses';
import * as courseSelectors from '../selectors/courses';
import { Module } from 'ostseee-web-common';

const CoursesOverview = props => {
  useRequest(courseQueryConfigs.coursesGet());
  const Courses = useSelector(courseSelectors.getCourses);

  const columns = [
    {
      field: 'termid',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Term',
      sortable: true,
    },
    {
      field: 'moduleid', 
      name: 'Module',
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
      field: "termid",
      direction: SortDirection.ASC,
    },
  };

  return (
    <>
      <EuiInMemoryTable
        items={Courses}  // adjust for server request
        columns={columns}
        sorting = {sorting}
      />
    </>
  );
};

export default CoursesOverview;