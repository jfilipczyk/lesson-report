import React from 'react';
import { TextField as MaterialTextField } from 'material-ui';

const TextField = ({ input, meta: { touched, error }, ...custom }) => (
  <MaterialTextField
    {...input}
    {...custom}
    errorText={touched && error}
  />
);

export default TextField;
