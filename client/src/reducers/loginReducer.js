import { CHANGE_LOGIN_STATE } from "../actions/index";
import { initialState } from "./initialState";

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATE:
      return Object.assign({}, state, {
        isLogIn: action.payload,
      });
    default:
      return state;
  }
};

export default loginReducer;
