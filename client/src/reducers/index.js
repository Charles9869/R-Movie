import { combineReducers } from 'redux';

import movies from './movies-reducer';
import pages from './page-reducer';
import comments from './comments-reducer';
import watchlist from './watchlist-reducer';

export default combineReducers({ movies, pages, comments, watchlist });
