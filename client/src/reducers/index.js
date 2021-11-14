import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import bookReducer from "./bookReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  loginReducer,
  bookReducer,
  notificationReducer,
});

export default rootReducer;
