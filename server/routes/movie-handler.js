const fetch = require('isomorphic-fetch');
const { MongoClient } = require('mongodb');
const { format } = require('date-fns');

require('dotenv').config({ path: '../.env' });

// Return all the popular movie from the database
const getPopularMovies = async (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=popularity.desc&page=${req.query.page}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send({ success: 'true', movies: data });
    });
};

// GET Returns a list a movie by search
const getMovieSearch = async (req, res) => {
  const { name } = req.query;
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send({ success: 'true', movies: data });
    });
};

// GET Returns a list of filtered movies
const getFilteredMovie = async (req, res) => {
  const { category, page } = req.query;
  let from = req.query.from;
  let to = req.query.to;
  if (from === '') from = '1900-01-01';
  if (to === '') to = format(new Date(), 'yyyy-LL-dd').toString();

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.API_KEY
    }&with_genres=${category}&primary_release_date.gte=${format(
      Date.parse(from),
      'yyyy-LL-dd'
    )}&primary_release_date.lte=${format(
      Date.parse(to),
      'yyyy-LL-dd'
    )}&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => res.send({ type: 'success', movies: data }));
};

// GET Returns a list of movies by genre
const getMovieByGenre = async (req, res) => {
  const { id } = req.query;
  fetch(
    ` https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${id}`
  )
    .then((res) => res.json())
    .then((data) => res.send({ type: 'success', movies: data }));
};

// GET Returns a movie by ID
const getMovieById = async (req, res) => {
  const { id } = req.params;
  fetch(
    ` https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => res.send({ type: 'success', movies: data }));
};

// POST Adds a comment to a movie
const postMovieComment = async (req, res) => {
  const { name, comment, src } = req.body;
  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');

    // Check if the movies exist in database
    db.collection('movies').findOne({ _id: req.body.id }, (err, data) => {
      if (err) throw new Error('Error');

      // Checks if the movies is in the database
      if (data) {
        let newCommentsArray = data.comments;
        newCommentsArray.push({ name: name, comment: comment, src: src });
        db.collection('movies').updateOne(
          { _id: req.body.id },
          { $set: { comments: newCommentsArray } }
        );
      } else {
        let newCommentsArray = [];
        newCommentsArray.push({ name: name, comment: comment, src: src });
        db.collection('movies').insertOne({
          _id: req.body.id,
          comments: newCommentsArray,
        });
      }
    });
  } catch (err) {
    client.close();
  }
};

// GET Returns an array of comments of a specific movie
const getCommentsById = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');
    db.collection('movies').findOne({ _id: parseInt(id) }, (err, data) => {
      if (data) {
        client.close();
        res.send({ type: 'success', comments: data.comments });
      } else {
        client.close();
        res.send({ type: 'error', comments: [] });
      }
    });
  } catch (err) {
    client.close();
  }
};

// GET Get a movie from the database with the ID
const getDatabaseMovieByID = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');
    db.collection('movies').findOne({ _id: parseInt(id) }, (err, data) => {
      if (data) res.send({ type: 'success', movie: data });
      else res.send({ type: 'error', movie: [] });
      client.close();
    });
  } catch (err) {
    client.close();
  }
};

// GET Returns all the actors from a movie
const getMovieActors = async (req, res) => {
  const { id } = req.params;

  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => res.send({ type: 'success', actors: data }));
};

// GET Returns all information about an actor
const getMovieActor = async (req, res) => {
  const { id } = req.params;
  fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => res.send({ type: 'success', actor: data }));
};

// GET Returns a list of movie in which an actor is playing
const getMovieFromActor = async (req, res) => {
  const { id } = req.params;
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=popularity.desc&with_cast=${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send({ type: 'success', movies: data });
    });
};

// POST A user can vote on a movie
const postMovieVote = async (req, res) => {
  const { id, voteValue } = req.body;
  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');
    db.collection('movies').findOne({ _id: parseInt(id) }, (err, data) => {
      if (err) throw new Error(err);
      if (data) {
        let vote = 1;
        let numberVote = 1;
        if (data.voteTotal !== undefined && data.voteCount) {
          vote = voteValue + data.voteTotal;
          numberVote += data.voteCount;
        } else {
          vote = voteValue;
          numberVote = 1;
        }

        db.collection('movies').updateOne(
          { _id: id },
          { $set: { voteTotal: vote, voteCount: numberVote } }
        );
      } else {
        let newData = {
          _id: id,
          comments: [],
          voteTotal: voteValue,
          voteCount: 1,
        };

        db.collection('movies').insertOne(newData);
      }
    });
  } catch (err) {
    client.close();
  }

  res.json({ type: 'successs' });
};

module.exports = {
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
};
