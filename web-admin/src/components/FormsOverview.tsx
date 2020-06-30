import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as ReduxQueryProvider, useRequest } from 'redux-query-react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiText,
  EuiButton,
} from "@elastic/eui";

import * as formQueryConfigs from '../query-configs/forms';
import * as formsSelectors from '../selectors/forms';
import { Form } from 'ostseee-web-common';
import TermDisplay from './TermDisplay';
import EuiCustomLink from '../EuiCustomLink';
import { useHistory } from 'react-router';

const FormsOverview = props => {
  useRequest(formQueryConfigs.formsGet());
  const Forms = useSelector(formsSelectors.getForms);
  console.log(Forms);
  const history = useHistory();
  const columns = [
    {
      field: 'id', 
      name: 'Id',
      truncateText: true,
      render: (data:string)=> {return <EuiCustomLink to={`/forms/${data}`}>{ data.slice(0,5)}</EuiCustomLink>}
    },
    {
      field: 'name',  // for further arguments, see https://elastic.github.io/eui/#/tabular-content/tables
      name: 'Form',
      sortable: true,
    },
    {
      field: 'termId', 
      name: 'Term',
      truncateText: true,
      render: (data)=> {return <TermDisplay termId={data}></TermDisplay>}
    },
  ];

  return ( 
    <>
      <h1>Forms Overview</h1>
      <EuiButton onClick={()=>history.push("/forms/new")} iconType="plusInCircle">Neu</EuiButton>
      <EuiBasicTable
        items={Forms}  // adjust for server request
        columns={columns}
      />
    </>
  );
};

export default FormsOverview;