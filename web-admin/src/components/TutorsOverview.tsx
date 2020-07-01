import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

import { getQueries } from '../lib/store';

import * as tutorQueryConfigs from '../query-configs/tutors';
import * as tutorSelectors from '../selectors/tutors';
import { Tutor } from 'ostseee-web-common';

const TutorsOverview = props => {
  const Tutors = useSelector (tutorSelectors.getTutors);

  const columns = [
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Tutor',
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
        items={Tutors}  // adjust for server request
        columns={columns}
      />
    </>
  );
};

export default TutorsOverview;