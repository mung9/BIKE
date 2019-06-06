import { SET_ERROR } from "./errorActionTypes";

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: { error }
  };
}
