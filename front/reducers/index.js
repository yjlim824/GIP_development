import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import auth from './auth';
import report from './report';
import log from './log';

// export default rootReducer;
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
     // console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        auth,
        report,
        log,
      });
      return combinedReducer(state, action, log);
    }
  }
};

export default rootReducer;
