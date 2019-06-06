import * as ACTION from "../actions/userActionTypes";
import * as AUTH_ACTION from "../actions/authActionTypes";
import { isError } from "util";

const initialState = {
  bike: null,
  error: ""
};

export default function rentReducer(user = initialState, action) {
  console.log("rentReducer Action:", action);
  switch (action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
      return { ...action.payload.user };
    case ACTION.REQ_GET_USER:
      return user;
    case ACTION.GET_USER_SUCCESS:
      return {...user, ...action.payload.user};
    case ACTION.GET_USER_FAIL:
      return {...user, error: action.payload.error}
    case ACTION.RENT_SUCCESS:
      return { ...user, ...action.payload.user };
    case ACTION.RENT_FAIL:
      return { ...user, error: action.payload.error };
    case ACTION.RETURN_SUCCESS:
      return { ...user, ...action.payload.user };
    case ACTION.RETURN_FAIL:
      return { ...user, error: action.payload.error };
    case ACTION.CLEAR_ERROR:
      return { ...user, error: "" };
    case ACTION.REQ_RETURN:
    case ACTION.REQ_RENT:
    default:
      return user;
  }
}
