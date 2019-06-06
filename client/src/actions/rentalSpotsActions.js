import * as ACTION from "./rentalSpotsActionTypes";

export function setRentalSpots(rentalSpots) {
  return {
    type: ACTION.SET_RENTAL_SPOTS,
    payload: {
      rentalSpots
    }
  };
}

export function reqGetRentalSpot(id) {
  return {
    type: ACTION.REQ_GET_RENTAL_SPOT,
    payload: {
      id
    }
  };
}

export function reqGetRentalSpots() {
  return {
    type: ACTION.REQ_GET_RENTAL_SPOTS
  };
}
