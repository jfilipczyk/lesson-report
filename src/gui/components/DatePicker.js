import React from 'react';
import { DatePicker as MaterialDatePicker } from 'material-ui';
import moment from 'moment';

const DatePicker = ({ input, meta: { touched, error }, ...custom }) => (
  <MaterialDatePicker
    {...input}
    {...custom}
    errorText={touched && error}
    value={input.value ? moment(input.value).toDate() : null}
    onChange={(e, v) => input.onChange(v)}
  />
);

export default DatePicker;
