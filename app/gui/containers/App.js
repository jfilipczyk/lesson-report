import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import CreateReportForm from './../components/CreateReportForm';
import createReport from './../services/createReport';
import sleep from './../../shared/sleep';

const App = connect(
  state => ({
    onSubmit: formData => sleep(1500) /* add sleep to show processing state */
        .then(() => createReport(formData))
        .catch(error => {
          throw new SubmissionError({ _error: `Create report error: ${error}` });
        }),
    submitSucceeded: state.submitSucceeded
  })
)(CreateReportForm);

export default App;
