import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';

import * as formQueryConfigs from '../query-configs/forms';
import * as formsSelectors from '../selectors/forms';
import { Form } from 'ostseee-web-common';

const FormsList = props => {
  useRequest(formQueryConfigs.testGet());
  const Forms = useSelector(formsSelectors.getForms);
    console.log(Forms);
  return (
    <ol>
      {Forms.slice(0, 30).map((form:Form) => (
        <li>{form.id}:{form.name}</li>
      ))}
    </ol>
  );
};

export default FormsList;