const express = require('express');
const router = express.Router();

require('dotenv').config({ path: '../.env' });

const {
  getPopularMovies,
  getMovieSearch,
  getFilteredMovie,
  getMovieByGenre,
  getMovieById,
  postMovieComment,
  getCommentsById,
  getMovieActors,
  getMovieActor,
  getMovieFromActor,
  postMovieVote,
  getDatabaseMovieByID,
} = require('./movie-handler');

router.get('/popular-movies', getPopularMovies);
router.get('/movie', getMovieSearch);
router.get('/movie/filter', getFilteredMovie);
router.get('/movies/genre', getMovieByGenre);
router.get('/movie/:id', getMovieById);
router.post('/movie/comment', postMovieComment);
router.get('/movie/comments/:id', getCommentsById);
router.get('/movie/actors/:id', getMovieActors);
router.get('/movie/actor/:id', getMovieActor);
router.get('/actor/:id/movies', getMovieFromActor);
router.post('/movie/vote', postMovieVote);
router.get('/movie/database/:id', getDatabaseMovieByID);

module.exports = router;
