import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import bookReducer from "./bookReducer";
import searchReducer from "./searchReduer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  loginReducer,
  bookReducer,
  searchReducer,
  notificationReducer,
});

export default rootReducer;
