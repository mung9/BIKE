import * as ACTION from "../actions/authActionTypes";

const initialState = {
  user: null,
  error: ""
};
export default function errorReducer(auth = initialState, action) {
  switch (action.type) {
    case ACTION.REQ_LOGIN:
      return auth;
    case ACTION.LOGIN_SUCCESS:
      return { ...auth, user: action.payload.user, error: "" };
    case ACTION.LOGIN_FAIL:
      return { ...auth, user: null, error: action.payload.error };
    case ACTION.CLEAR_ERROR:
      return { ...auth, error: "" };
    default:
      return auth;
  }
}
