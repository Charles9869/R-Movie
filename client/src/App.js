import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import components
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';
import { useAuth0 } from './components/SignIn/react-auth0-spa';
import history from './utils/history';
import PrivateRoute from './components/SignIn/PrivateRoute';

const App = () => {
  const { loading } = useAuth0();

  if (loading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Router history={history}>
        <Navbar />
        <Showcase />
        <Switch>
          <Route exact path='/'>
            <h1>Homepage</h1>
          </Route>
          <Route exact path='/movie/:id'>
            <h1>Movie Page</h1>
          </Route>
          <Route exact path='/actor/:id'>
            <h1>Actor page</h1>
          </Route>
          <PrivateRoute path='/profile' component={Navbar} />
          <Route exact path='/chat'>
            <h1>Chat</h1>
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </React.Fragment>
  );
};

export default App;
