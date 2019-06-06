import {saga} from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import rentalSpotsSaga from './rentalSpotsSaga';
import rentSaga from './rentSaga';
import authSaga from './authSaga';

const sagas = [rentalSpotsSaga, rentSaga, authSaga];
const rootSaga = function* (){
  yield all(sagas.map(saga=>fork(saga)));
}

export default rootSaga;