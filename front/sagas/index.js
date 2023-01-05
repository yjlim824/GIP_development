import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './auth';
import reportSaga from './report';
import logSaga from './log';
import backUrl from '../config/config';


//axios.defaults.baseURL = 'http://111.2.1.167:4000';
axios.defaults.baseURL = 'http://localhost:4000';
//axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(reportSaga),
    fork(logSaga),
  ]);
}