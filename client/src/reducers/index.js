import {combineReducers} from 'redux';
import rentalSpotsReducer from './rentalSpotsReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  rentalSpots: rentalSpotsReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;