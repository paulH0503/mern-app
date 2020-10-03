import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/Landing';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path='/' component={LandingPage} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
