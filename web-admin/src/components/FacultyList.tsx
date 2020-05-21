import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';

import * as facultyQueryConfigs from '../query-configs/faculties';
import * as facultysSelectors from '../selectors/faculties';
import { Faculty } from 'ostseee-web-common';

const FacultiesList = props => {
  useRequest(facultyQueryConfigs.facultiesGet());
  const Faculties = useSelector(facultysSelectors.getFaculties);
    console.log(Faculties);
  return (
    <>Hallo<ol>
      {Faculties.slice(0, 30).map((faculty:Faculty) => (
        <li>{faculty.id}:{faculty.name}</li>
      ))}
    </ol>
    </>
  );
};

export default FacultiesList;