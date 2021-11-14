import { LOGIN_STATE_CHANGE } from "../actions/index";
import { initialState } from "./initialState";

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STATE_CHANGE:
      return Object.assign({}, state, {
        isLogIn: action.payload,
      });
    default:
      return state;
  }
};

export default loginReducer;
