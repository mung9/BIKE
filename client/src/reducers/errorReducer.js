import * as ACTION from "../actions/errorActionTypes";

export default function errorReducer(error = "", action) {
  switch (action.type) {
    case ACTION.SET_ERROR:
      return action.payload.error;
    default:
      return error;
  }
}
