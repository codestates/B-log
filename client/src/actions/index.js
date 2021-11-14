export const LOGIN_STATE_CHANGE = "LOGIN_STATE_CHANGE";
export const GET_RACK_BOOKS = "ADD_MYBOOKS";
export const REMOVE_RACK_BOOK = "REMOVE_MYBOOKS";
export const GET_SHELF_BOOKS = "GET_SHELF_BOOKS";
export const REMOVE_SHELF_BOOK = "REMOVE_SHELF_BOOK";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";

export const loginStateChange = (boolean) => {
  return {
    type: LOGIN_STATE_CHANGE,
    payload: boolean,
  };
};

export const getRackBooks = (books) => {
  return {
    type: GET_RACK_BOOKS,
    payload: { books },
  };
};

export const removeRackbook = (bookId) => {
  return {
    type: REMOVE_RACK_BOOK,
    payload: {
      bookId,
    },
  };
};

export const getShelfBooks = (books) => {
  return {
    type: GET_SHELF_BOOKS,
    payload: { books },
  };
};

export const removeShelfbook = (bookId) => {
  return {
    type: REMOVE_SHELF_BOOK,
    payload: {
      bookId,
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
