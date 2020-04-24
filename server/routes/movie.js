const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
require('dotenv').config({ path: '../.env' });

// GET The most popular movies
router.get('/popular-movies', (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=popularity.desc`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send({ success: 'true', movies: data });
    });
});

module.exports = router;
