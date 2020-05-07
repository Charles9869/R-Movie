const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../../.env' });

// Function that slices the key from user authentication
const formatAuthKey = (key) => {
  return key.slice(key.indexOf('|') + 1, key.length);
};

// POST Adds user to the database if it's doesn't exist
const loginUser = async (req, res) => {
  const id = formatAuthKey(req.body.user.sub);

  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');

    db.collection('users').findOne({ _id: id }, (err, data) => {
      if (err) throw new Error('error');
      if (data) {
        client.close();
        res.send({ type: 'error', message: 'User already exist' });
      } else {
        db.collection('users').insertOne({
          _id: id,
          user: req.body.user,
          watchlist: [],
        });
        res.send({ type: 'success', message: 'User was created' });
      }
    });
  } catch (err) {
    client.close();
  }
};

// PUT Updates the user watchlist by removing or adding the new movie in it
const updateUserWatchlist = async (req, res) => {
  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');

    db.collection('users').findOne({ _id: req.body._id }, (err, data) => {
      if (err) throw new Error(err);
      let newWatchlist = data.watchlist;
      newWatchlist.push(req.body.movie);
      db.collection('users').updateOne(
        { _id: req.body._id },
        { $set: { watchlist: newWatchlist } }
      );
    });
  } catch (err) {
    client.close();
  }
  res.send({ type: 'success' });
};

// GET Returns the user watchlist
const getUserWatchlist = async (req, res) => {
  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');

    db.collection('users').findOne({ _id: req.query._id }, (err, data) => {
      if (err) throw new Error(err);
      if (data) res.send({ type: 'success', watchlist: data.watchlist });
    });
  } catch (err) {
    client.close();
  }
};

// DELETE Removes a movie from the user watchlist
const removeUserMovieFromWatchlist = async (req, res) => {
  const _id = formatAuthKey(req.body._id);
  const client = new MongoClient(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('R@Movie');
    db.collection('users').findOne({ _id: _id }, (err, data) => {
      if (err) throw new Error(err);
      let newWatchlist = data.watchlist.filter(
        (element) => element.id !== req.body.id
      );

      db.collection('users').updateOne(
        { _id: _id },
        { $set: { watchlist: newWatchlist } }
      );
    });
  } catch (error) {
    client.close();
  }
  res.send({ type: 'success' });
};

module.exports = {
  loginUser,
  updateUserWatchlist,
  getUserWatchlist,
  removeUserMovieFromWatchlist,
};
