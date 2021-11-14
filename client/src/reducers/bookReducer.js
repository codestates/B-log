import {
  GET_RACK_BOOKS,
  REMOVE_RACK_BOOK,
  GET_SHELF_BOOKS,
  REMOVE_SHELF_BOOK,
} from "../actions/index";
import { initialState } from "./initialState";

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RACK_BOOKS:
      return Object.assign({}, state, {
        rack: [...action.payload.books],
      });
    case REMOVE_RACK_BOOK:
      const newRack = state.rack.filter((book) => {
        return book.id !== action.payload.bookId;
      });
      return Object.assign({}, state, {
        rack: newRack,
      });
    case GET_SHELF_BOOKS:
      return Object.assign({}, state, {
        shelf: [...action.payload.books],
      });
    case REMOVE_SHELF_BOOK:
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
