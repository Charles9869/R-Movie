const express = require('express');
const router = express.Router();
const {
  loginUser,
  updateUserWatchlist,
  getUserWatchlist,
  removeUserMovieFromWatchlist,
} = require('./user-handler');

router.post('/user/login', loginUser);
router.post('/user/watchlist', updateUserWatchlist);
router.get('/user/getwatchlist', getUserWatchlist);
router.delete('/user/watchlist', removeUserMovieFromWatchlist);

module.exports = router;
