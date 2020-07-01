import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';
import { useHistory } from 'react-router';

import {
  EuiButton,
  EuiInMemoryTable,
  EuiButtonIcon,
  SortDirection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiTitle,
} from "@elastic/eui";

import * as moduleQueryConfigs from '../query-configs/modules';
import * as moduleSelectors from '../selectors/modules';

const ModulesOverview = props => {
  useRequest(moduleQueryConfigs.modulesGet());
  const Modules = useSelector(moduleSelectors.getModules);
  const history = useHistory();

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
      direction: SortDirection.ASC,
    },
  };

  const getRowProps = (item) => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => history.push("/modules/"+id),
    };
  };

  return (
    <EuiPageContent >
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h1>Module</h1>
                  </EuiTitle></EuiPageContentHeaderSection>
                <EuiPageContentHeaderSection>
                <EuiButton fill iconType="plusInCircle"  
              onClick={() => history.push("/modules/new")}>
        Neues Modul anlegen
      </EuiButton> 
                   </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
            <EuiInMemoryTable
        items={Modules}  // adjust for server request
        columns={columns}
        sorting = {sorting}
        rowProps={getRowProps}
        /> </EuiPageContentBody>
        </EuiPageContent>

  );
};

export default ModulesOverview;