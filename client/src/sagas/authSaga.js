import { takeEvery, put, call, select, delay } from "redux-saga/effects";

import * as authService from '../services/auth';
import * as authActions from '../actions/authActions';
import * as ACTION from '../actions/authActionTypes';
import * as errorActions from '../actions/errorActions';

// const getOriginalTodos = state => state.todos;

// function* handleGetRentalSpots() {
//   try {
//     const { data: rentalSpots } = yield call(rentalSpotService.getRentalSpots);
//     console.log(rentalSpots);
//     yield put(rentalSpotsActions.reqGetRentalSpot());
//   } catch (error) {
//     yield put(errorActions.setError(error));
//   }
// }

function* handlePostAuth(action) {
  try {
    const {data: user} = yield call(authService.postAuth, action.payload);
    yield put(authActions.loginSuccess(user));
  } catch (error) {
    yield put(authActions.loginFail('이메일 혹은 비밀번호가 올바르지 않습니다.'));
    yield put(errorActions.setError(error));
    yield delay(3000);
    yield put(authActions.clearError());
  }
}

export default function* watchAuthRequest() {
  yield takeEvery(ACTION.REQ_LOGIN, handlePostAuth);
}
