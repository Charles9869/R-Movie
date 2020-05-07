import {
  ADD_COMMENT,
  RECEIVE_ALL_COMMENTS,
  CLEAR_STATE,
} from '../actions/types';

const initialState = [];

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALL_COMMENTS: {
      let newState = state;
      newState = action.payload;
      return newState;
    }

    case ADD_COMMENT: {
      let newState = state;
      newState.push(action.payload);
      return newState;
    }
    case CLEAR_STATE: {
      return state;
    }

    default:
      return state;
  }
}
