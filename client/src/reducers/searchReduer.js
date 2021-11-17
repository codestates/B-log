import { GET_SEARCH_KEYWORD, GET_SEARCH_RESULT } from "../actions";
import { initialState } from "./initialState";

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_KEYWORD:
      return Object.assign({}, state, {
        searchKeyword: action.payload.keyword,
      });

    case GET_SEARCH_RESULT:
      return Object.assign({}, state, { searchResult: action.payload.books });

    default:
      return state;
  }
};

export default searchReducer;
