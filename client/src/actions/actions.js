// Import action types
import {
  RECEIVE_ALL_MOVIE_INFO,
  REQUEST_ALL_MOVIE_INFO,
  CLEAR_MOVIES,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  ADD_COMMENT,
  RECEIVE_ALL_COMMENTS,
  CLEAR_STATE,
  ADD_TO_WATCHLIST,
  RECEIVE_WATCHLIST,
  REMOVE_MOVIE_FROM_WATCHLIST,
} from './types';

export const receiveAllMovieInfo = (payload) => ({
  type: RECEIVE_ALL_MOVIE_INFO,
  payload,
});

export const requestAllMovieInfo = () => ({ type: REQUEST_ALL_MOVIE_INFO });

export const clearMovies = () => ({ type: CLEAR_MOVIES });
export const incrementPage = () => ({ type: INCREMENT_PAGE });
export const decrementPage = () => ({ type: DECREMENT_PAGE });

export const addComment = (payload) => ({ type: ADD_COMMENT, payload });
export const receiveAllComments = (payload) => ({
  type: RECEIVE_ALL_COMMENTS,
  payload,
});
export const clearState = () => ({ type: CLEAR_STATE });
export const addToWatchlist = (payload) => ({
  type: ADD_TO_WATCHLIST,
  payload,
});
export const removeFromWatchlist = (payload) => ({
  type: REMOVE_MOVIE_FROM_WATCHLIST,
  payload,
});
export const receiveWatchlist = (payload) => ({
  type: RECEIVE_WATCHLIST,
  payload,
});
