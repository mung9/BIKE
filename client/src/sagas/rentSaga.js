import { takeEvery, put, call, select } from "redux-saga/effects";

import * as rentService from "../services/user";
import * as rentActions from "../actions/userActions";
import * as ACTION from "../actions/userActionTypes";
import * as errorActions from "../actions/errorActions";

import { getAuth } from "../auth/auth";

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
    alert(`${payload.index+1}번째 거치대의 자전거를 대여했습니다`);
  } catch (error) {
    yield put(rentActions.rentFail("대여할 수 없는 상태입니다."));
    yield put(errorActions.setError(error));
  }
}

function* handleReturn(action) {
  try {
    const { payload } = action;
    const { data: bike } = yield call(
      rentService.returnBike,
      payload.rentalSpot,
      payload.index,
      payload.bike
    );
    yield put(rentActions.returnSuccess());
  } catch (error) {
    yield put(rentActions.returnFail("반납을 실패했습니다."));
    yield put(errorActions.setError(error));
  }
}

function* handleGetUser(action) {
  try {
    const { data: user } = yield call(rentService.getUser, action.payload.id);
    yield put(rentActions.getUserSuccess(user));
  } catch (error) {
    yield put(rentActions.getUserFail("유저 정보를 가져오는데에 실패했습니다.."));
    yield put(errorActions.setError(error));
  }
}

export default function* watchRentRequest() {
  yield takeEvery(ACTION.REQ_RENT, handleRent);
  yield takeEvery(ACTION.REQ_RETURN, handleReturn);
  yield takeEvery(ACTION.REQ_GET_USER, handleGetUser);
}
