import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

import * as formQueryConfigs from '../query-configs/forms';
import * as formsSelectors from '../selectors/forms';
import { Form } from 'ostseee-web-common';

const FormsOverview = props => {
  useRequest(formQueryConfigs.formsGet());
  const Forms = useSelector(formsSelectors.getForms);
  console.log(Forms);

  const columns = [
    {
      field: 'Lecturer',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Lecturer',
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
      <h1>Forms Overview</h1>
      <EuiBasicTable
        items={Forms}  // adjust for server request
        columns={columns}
      />
    </>
  );
};

export default FormsOverview;