export const CHANGE_LOGIN_STATE = "CHANGE_LOGIN_STATE";
export const UPDATE_RACK = "UPDATE_RACK";
export const ADD_TO_RACK = "ADD_TO_RACK";
export const REMOVE_FROM_RACK = "REMOVE_FROM_RACK";
export const UPDATE_SHELF = "UPDATE_SHELF";
export const ADD_TO_SHELF = "ADD_TO_SHELF";
export const REMOVE_FROM_SHELF = "REMOVE_FROM_SHELF";
export const GET_SEARCH_KEYWORD = "GET_SEARCH_KEYWORD";
export const GET_SEARCH_RESULT = "GET_SEARTCH_RESULT";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";

export const loginStateChange = (boolean) => {
  return {
    type: CHANGE_LOGIN_STATE,
    payload: boolean,
  };
};

export const updateRack = (books) => {
  return {
    type: UPDATE_RACK,
    payload: { books },
  };
};

export const addToRack = (book) => {
  return {
    type: ADD_TO_RACK,
    payload: { book },
  };
};

export const removeFromRack = (bookId) => {
  return {
    type: REMOVE_FROM_RACK,
    payload: {
      bookId,
    },
  };
};

export const updateShelf = (books) => {
  return {
    type: UPDATE_SHELF,
    payload: { books },
  };
};

export const addToShelf = (book) => {
  return {
    type: ADD_TO_SHELF,
    payload: { book },
  };
};

export const removeFromShelf = (bookId) => {
  return {
    type: REMOVE_FROM_SHELF,
    payload: {
      bookId,
    },
  };
};

export const getSearchKeyword = (keyword) => {
  return {
    type: GET_SEARCH_KEYWORD,
    payload: {
      keyword,
    },
  };
};

export const getSearchResult = (books) => {
  return {
    type: GET_SEARCH_RESULT,
    payload: {
      books,
    },
  };
};

export const notify =
  (message, dismissTime = 3000) =>
  (dispatch) => {
    dispatch(enqueueNotification(message, dismissTime));
    setTimeout(() => {
      dispatch(dequeueNotification());
    }, dismissTime);
  };

export const enqueueNotification = (message, dismissTime) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
    },
  };
};

export const dequeueNotification = () => {
  return {
    type: DEQUEUE_NOTIFICATION,
  };
};
