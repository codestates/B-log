import {
  UPDATE_RACK,
  ADD_TO_RACK,
  REMOVE_FROM_RACK,
  UPDATE_SHELF,
  ADD_TO_SHELF,
  REMOVE_FROM_SHELF,
} from "../actions/index";
import { initialState } from "./initialState";

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RACK:
      return Object.assign({}, state, {
        rack: [...action.payload.books],
      });

    case ADD_TO_RACK:
      return Object.assign({}, state, {
        rack: [...state.rack, action.payload.book],
      });

    case REMOVE_FROM_RACK:
      const newRack = state.rack.filter((book) => {
        return book.id !== action.payload.bookId;
      });
      return Object.assign({}, state, {
        rack: newRack,
      });

    case UPDATE_SHELF:
      return Object.assign({}, state, {
        shelf: [...action.payload.books],
      });

    case ADD_TO_SHELF:
      return Object.assign({}, state, {
        shelf: [...state.shelf, action.payload.book],
      });

    case REMOVE_FROM_SHELF:
      const newShelf = state.shelf.filter((book) => {
        return book.id !== action.payload.bookId;
      });
      return Object.assign({}, state, {
        shelf: newShelf,
      });

    default:
      return state;
  }
};

export default bookReducer;
