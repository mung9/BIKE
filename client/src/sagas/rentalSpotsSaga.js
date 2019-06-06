import { takeEvery, put, call, select } from "redux-saga/effects";

import * as rentalSpotService from "../services/rentalSpot";
import * as rentalSpotsActions from "../actions/rentalSpotsActions";
import * as ACTION from "../actions/rentalSpotsActionTypes";
import * as errorActions from "../actions/errorActions";

// const getOriginalTodos = state => state.todos;

function* handleGetRentalSpots() {
  try {
    const { data: rentalSpots } = yield call(rentalSpotService.getRentalSpots);
    yield put(rentalSpotsActions.setRentalSpots(rentalSpots));
  } catch (error) {
    yield put(errorActions.setError(error));
  }
}


// function* handlePostTodo(action) {
//   try {
//     const { data: todo } = yield call(todoService.postTodo, action.todo);
//     yield put(ajaxActions.addTodo(todo));
//   } catch (error) {
//     yield put(ajaxActions.setError(error.toString()));
//   }
// }

// function* handlePutTodo(action) {
//   const originalTodos = yield select(getOriginalTodos);
//   try {
//     yield put(ajaxActions.updateTodo(action.todo));
//     yield todoService.putTodo(action.todo);
//   } catch (error) {
//     yield put(ajaxActions.setError(error));
//     yield put(ajaxActions.rollback(originalTodos));
//   }
// }

// function* handleDeleteTodo(action) {
//   const originalTodos = yield select(getOriginalTodos);
//   try {
//     yield put(ajaxActions.removeTodo(action.id));
//     yield call(todoService.deleteTodo, action.id);
//   } catch (error) {
//     yield put(ajaxActions.setError(error));
//     yield put(ajaxActions.rollback(originalTodos));
//   }
// }

export default function* watchRentalSpotsRequest() {
  yield takeEvery(ACTION.REQ_GET_RENTAL_SPOTS, handleGetRentalSpots);
}
