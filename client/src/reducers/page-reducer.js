import { INCREMENT_PAGE, DECREMENT_PAGE } from '../actions/types';

const initialState = 1;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_PAGE:
      return state + 1;
    case DECREMENT_PAGE:
      if (state - 1 <= 0) return state;
      else return state - 1;
    default:
      return state;
  }
}
