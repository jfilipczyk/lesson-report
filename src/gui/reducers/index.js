import { combineReducers } from 'redux';
import { reducer as formReducer, actionTypes } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  submitSucceeded: (submitSucceeded = false, action) => {
    switch (action.type) {
      case actionTypes.TOUCH: return false;
      case actionTypes.START_SUBMIT: return false;
      case actionTypes.STOP_SUBMIT: return !action.errors;
      default: return submitSucceeded;
    }
  },
});

export default rootReducer;
