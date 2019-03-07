import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';

//import components
import Header from './components/Header.js';
import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js';
import UserPage from './components/UserPage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              path="/home"
              component={LoginPage}
            />
            <Route
              path="/register"
              component={RegisterPage}
            />
            <Route
              path="/user"
              component={UserPage}
            />
            {/* OTHERWISE (no path!) */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
