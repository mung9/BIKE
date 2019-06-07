import { takeEvery, put, call, select } from "redux-saga/effects";

import * as rentService from "../services/user";
import * as rentActions from "../actions/userActions";
import * as ACTION from "../actions/userActionTypes";
import * as errorActions from "../actions/errorActions";

function* handleRent(action) {
  try {
    const { payload } = action;
    const { data } = yield call(
      rentService.rentBike,
      payload.rentalSpot,
      payload.index
    );

    const { user, rentalSpot } = data;
    yield put(rentActions.rentSuccess(user, rentalSpot));
    alert(`${payload.index + 1}번째 거치대의 자전거를 대여했습니다`);
  } catch (error) {
    yield put(rentActions.rentFail("대여할 수 없는 상태입니다."));
    yield put(errorActions.setError(error));
  }
}

function* handleReturn(action) {
  try {
    const { payload } = action;
    const { data } = yield call(
      rentService.returnBike,
      payload.rentalSpot,
      payload.index,
      { bike: payload.bike }
    );

    const { user, rentalSpot } = data;
    yield put(rentActions.returnSuccess(user, rentalSpot));
  } catch (error) {
    yield put(rentActions.returnFail("반납을 실패했습니다."));
    yield put(errorActions.setError(error));
  }
}

function* handleGetUser() {
  try {
    const { data: user } = yield call(rentService.getUser);
    yield put(rentActions.getUserSuccess(user));
  } catch (error) {
    yield put(
      rentActions.getUserFail("유저 정보를 가져오는데에 실패했습니다..")
    );
    yield put(errorActions.setError(error));
  }
}

export default function* watchRentRequest() {
  yield takeEvery(ACTION.REQ_RENT, handleRent);
  yield takeEvery(ACTION.REQ_RETURN, handleReturn);
  yield takeEvery(ACTION.REQ_GET_USER, handleGetUser);
}
