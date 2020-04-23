import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import components
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import Header from './components/Header';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
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
