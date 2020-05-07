import {
  ADD_TO_WATCHLIST,
  RECEIVE_WATCHLIST,
  REMOVE_MOVIE_FROM_WATCHLIST,
} from '../actions/types';

import { produce } from 'immer';

const initialState = [];

export default function watchListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      return produce(state, (draftState) => {
        draftState.push(action.payload);
      });

    case RECEIVE_WATCHLIST: {
      let newState = action.payload;
      return newState;
    }

    case REMOVE_MOVIE_FROM_WATCHLIST: {
      let newState = state.filter(
        (element) => element.id !== action.payload.id
      );
      return newState;
    }

    default:
      return state;
  }
}
