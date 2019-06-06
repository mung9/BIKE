import * as ACTION from "./userActionTypes";

export function reqRent(rentalSpot, index) {
  return {
    type: ACTION.REQ_RENT,
    payload: {
      rentalSpot,
      index
    }
  };
}

export function rentFail(error) {
  return {
    type: ACTION.RENT_FAIL,
    payload: { error }
  };
}

export function rentSuccess(user, rentalSpot) {
  return {
    type: ACTION.RENT_SUCCESS,
    payload: { user, rentalSpot }
  };
}

export function reqReturn(rentalSpot, index, bike) {
  return {
    type: ACTION.REQ_RETURN,
    payload: {
      rentalSpot,
      index,
      bike
    }
  };
}

export function returnFail(error) {
  return {
    type: ACTION.RETURN_FAIL,
    payload: { error }
  };
}

export function returnSuccess() {
  return {
    type: ACTION.RETURN_SUCCESS
  };
}

export function clearError(){
  return {
    type: ACTION.CLEAR_ERROR
  }
}

export function reqGetUser(id) {
  return {
    type: ACTION.REQ_GET_USER
  };
}
export function getUserSuccess(user) {
  return {
    type: ACTION.GET_USER_SUCCESS,
    payload: { user }
  };
}
export function getUserFail(error) {
  return {
    type: ACTION.GET_USER_FAIL,
    payload: { error }
  };
}
