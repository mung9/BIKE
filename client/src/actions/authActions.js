import * as ACTION from "./authActionTypes";

export function reqLogin(username, password) {
  return {
    type: ACTION.REQ_LOGIN,
    payload: {
      username,
      password
    }
  };
}

export function loginSuccess(user) {
  window.sessionStorage.setItem('user', JSON.stringify(user));
  return {
    type: ACTION.LOGIN_SUCCESS,
    payload: {
      user
    }
  };
}

export function loginFail(error) {
  return {
    type: ACTION.LOGIN_FAIL,
    payload: {
      error
    }
  };
}

export function clearError() {
  return {
    type: ACTION.CLEAR_ERROR
  };
}
