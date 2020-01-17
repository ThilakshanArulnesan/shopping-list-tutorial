// This file brings together all other reducers

import { combineReducers } from "redux"; //combines reducers together
import itemReducer from "./itemReducer"; //personal reducer

//Combines reducers:
export default combineReducers({
  item: itemReducer
});
