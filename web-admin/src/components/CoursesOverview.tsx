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
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiButton,
  EuiPageContentBody,
} from "@elastic/eui";

import { getQueries } from '../lib/store';

import * as courseQueryConfigs from '../query-configs/courses';
import * as courseSelectors from '../selectors/courses';
import { Module } from 'ostseee-web-common';
import ModuleDisplay from './ModuleDisplay'
import TermDisplay from './TermDisplay';
import CourseProfsDisplay from './CourseProfsDisplay';
import EuiCustomLink from '../EuiCustomLink';
import { useHistory } from 'react-router';

const CoursesOverview = props => {
  useRequest(courseQueryConfigs.coursesGet());
  const Courses = useSelector(courseSelectors.getCourses);

  const columns = [
    {
      field: 'id', 
      name: 'Id',
      truncateText: true,
      render: (data:string)=> {return <EuiCustomLink to={`/courses/${data}`}>{ data.slice(0,5)}</EuiCustomLink>}
    },
    {
      field: 'termId',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Term',
      sortable: true,
      render: (data)=> {return <TermDisplay termId={data}></TermDisplay>}
    },
    {
      field: 'moduleId', 
      name: 'Module',
      truncateText: true,
      render: (data)=> {return <ModuleDisplay id={data}></ModuleDisplay>}
    },
    {
      field: 'id', 
      name: 'Profs',
      truncateText: true,
      render: (data)=> {return <CourseProfsDisplay id={data}></CourseProfsDisplay>}
    },
    {
      field: 'numberOfStudents', 
      name: '# Students',
      truncateText: true
    },
    {
      field: 'language', 
      name: 'Sprache',
      truncateText: true
    },
    {
      field: 'location', 
      name: 'Ort',
      truncateText: true
    },
    {
      field: 'thirdPartyKey', 
      name: '3rd-Party Key',
      truncateText: true
    },
    {
      field: 'progress', 
      name: 'Progress',
      truncateText: true
    },
    {
      field: 'clearance', 
      name: 'Freigabe',
      truncateText: true
    },
  ];

  const sorting = {
    sort: {
      field: "termId",
      direction: SortDirection.ASC,
    },
  };
  const history = useHistory()
  return (
    <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h1>Veranstaltung</h1>
                  </EuiTitle></EuiPageContentHeaderSection>
                <EuiPageContentHeaderSection>
                <EuiButton fill iconType="plusInCircle"  
              onClick={() => history.push("/courses/new")}>
        Neue Veranstaltung anlegen
      </EuiButton> 
                   </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
            <EuiInMemoryTable
        items={Courses}  // adjust for server request
        columns={columns}
        sorting = {sorting}
        /> </EuiPageContentBody>
        </EuiPageContent>
  );
};

export default CoursesOverview;