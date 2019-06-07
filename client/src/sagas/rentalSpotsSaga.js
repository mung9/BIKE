import { takeEvery, put, call, select } from "redux-saga/effects";

import * as rentalSpotService from "../services/rentalSpot";
import * as rentalSpotsActions from "../actions/rentalSpotsActions";
import * as ACTION from "../actions/rentalSpotsActionTypes";
import * as errorActions from "../actions/errorActions";

function* handleGetRentalSpots() {
  try {
    const { data: rentalSpots } = yield call(rentalSpotService.getRentalSpots);
    yield put(rentalSpotsActions.setRentalSpots(rentalSpots));
  } catch (error) {
    yield put(errorActions.setError(error));
  }
}

export default function* watchRentalSpotsRequest() {
  yield takeEvery(ACTION.REQ_GET_RENTAL_SPOTS, handleGetRentalSpots);
}
