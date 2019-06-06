import * as ACTION from "../actions/rentalSpotsActionTypes";
import * as RENT_ACTION from "../actions/userActionTypes";

export default function rentalSpotsReducer(rentalSpots = [], action) {
  switch (action.type) {
    case ACTION.SET_RENTAL_SPOTS:
      return action.payload.rentalSpots;

    case RENT_ACTION.RENT_SUCCESS:
      const updatedRentalSpot = action.payload.rentalSpot;
      return rentalSpots.map(rentalSpot => {
        return rentalSpot._id === updatedRentalSpot._id
          ? updatedRentalSpot
          : rentalSpot;
      });
    /******* REQUEST ********/
    case ACTION.REQ_GET_RENTAL_SPOT:
    case ACTION.REQ_GET_RENTAL_SPOTS:
    default:
      return rentalSpots;
  }
}
