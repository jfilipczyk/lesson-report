import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton, LinearProgress } from 'material-ui';
import TextField from './TextField';
import DatePicker from './DatePicker';
import styles from './CreateReportForm.css';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['calendarUrl', 'dateFrom', 'dateTo'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const renderCreateReportForm = ({ handleSubmit, submitting, error, submitSucceeded }) => (
  <form onSubmit={handleSubmit} className={styles.form} >
    <Field name="calendarUrl" component={TextField} floatingLabelText="iCal URL" fullWidth />
    <Field name="dateFrom" component={DatePicker} floatingLabelText="Date from" autoOk fullWidth mode="landscape" />
    <Field name="dateTo" component={DatePicker} floatingLabelText="Date to" autoOk fullWidth mode="landscape" />
    <RaisedButton type="submit" label="Submit" primary disabled={submitting} />
    {submitting && <div className={styles.progress} ><LinearProgress mode="indeterminate" /></div>}
    {submitSucceeded && <div className={styles.successMsg} >Report saved!</div>}
    {error && <div className={styles.errorMsg} >{error}</div>}
  </form>
);

const CreateReportForm = reduxForm({
  form: 'create-report',
  validate
})(renderCreateReportForm);

export default CreateReportForm;
