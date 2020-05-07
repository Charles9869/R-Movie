import {
  REQUEST_ALL_MOVIE_INFO,
  RECEIVE_ALL_MOVIE_INFO,
  CLEAR_MOVIES,
} from '../actions/types';

const initialState = {
  movies: [],
  status: null,
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_MOVIE_INFO: {
      return {
        ...state,
        status: ' loading',
      };
    }
    case RECEIVE_ALL_MOVIE_INFO:
      return {
        ...state,
        movies: action.payload,
        status: 'idle',
      };

    case CLEAR_MOVIES: {
      return state;
    }

    default:
      return state;
  }
}
