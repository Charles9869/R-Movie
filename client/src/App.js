import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Import components
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';
import SearchBar from './components/Filter/SearchBar';
import MovieDetails from './components/MovieDetails';
import { useAuth0 } from './components/SignIn/react-auth0-spa';
import history from './utils/history';
import PrivateRoute from './components/SignIn/PrivateRoute';
import Chat from './components/Chat';
import MovieGenre from './components/MovieGenre';
import Footer from './components/Footer';
import Watchlist from './components/Watchlist';
import ActorsDetails from './components/Actors/ActorsDetail';

// Import actions
import { receiveAllMovieInfo, requestAllMovieInfo } from './actions/actions';

const App = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  // Import state
  const movies = useSelector((state) => state.movies.movies);
  const page = useSelector((state) => state.pages);

  React.useEffect(() => {
    dispatch(requestAllMovieInfo());
    fetch(`/popular-movies?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        const { movies } = data;
        dispatch(receiveAllMovieInfo(movies.results));
      });
  }, [page, movies.status]);

  React.useEffect(() => {
    if (user !== undefined) {
      fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({ user: user }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  }, [user]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
      }}
    >
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Showcase />
            <SearchBar />
          </Route>
          <Route exact path='/movie/:id'>
            <MovieDetails />
          </Route>
          <Route exact path='/actor/:id'>
            <ActorsDetails />
          </Route>
          <Route exact path='/movies/:id'>
            <MovieGenre />
          </Route>
          <PrivateRoute path='/profile' component={Navbar} />
          <PrivateRoute path='/watchlist' component={Watchlist} />
          <Route exact path='/chat'>
            <Chat />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
      <Footer />
    </div>
  );
};

export default App;
