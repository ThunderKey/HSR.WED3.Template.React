// @flow

import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MenuBar from "./components/MenuBar";
import Dashboard from "./components/Dashboard";
import AllTransactions from "./components/AllTransactions";

import PrivateRoute from "./components/PrivateRoute";

import * as api from "./api";
import UserCache from "./UserCache";

import type { User } from "./api";

type State = {
  isAuthenticated: boolean,
  token: ?string,
  user: ?User
};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    const token = UserCache.getToken();
    const user = UserCache.getUser();
    if (token && user) {
      this.state = {
        isAuthenticated: true,
        token,
        user: user
      };
    } else {
      this.state = {
        isAuthenticated: false,
        token: undefined,
        user: undefined
      };
    }
  }

  authenticate = (
    login: string,
    password: string,
    cb: (error: ?Error) => void
  ) => {
    api
      .login(login, password)
      .then(({ token, owner }) => {
        this.setState({ isAuthenticated: true, token, user: owner });
        UserCache.set(owner, token);
        cb(null);
      })
      .catch(error => cb(error));
  };

  signout = (callback: () => void) => {
    this.setState({
      isAuthenticated: false,
      token: undefined,
      user: undefined
    });
    UserCache.clear();
    callback();
  };

  render() {
    const { isAuthenticated, user, token } = this.state;


    return (
      <Router>
        <div>
          <MenuBar user={isAuthenticated && user} signout={this.signout} />
          <main>
            <Route
              exact
              path="/"
              render={props => (
                <Home {...props} isAuthenticated={isAuthenticated} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} authenticate={this.authenticate} />
              )}
            />
            <Route path="/signup" render={props => (
                <Signup {...props} authenticate={this.authenticate} />
              )}/>
            {/*
              The following are protected routes that are only available for logged-in users. We also pass the user and token so
              these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
            */}
            <PrivateRoute
              path="/dashboard"
              isAuthenticated={isAuthenticated}
              token={token}
              user={user}
              component={Dashboard}
            />
            <PrivateRoute
              path="/transactions"
              isAuthenticated={isAuthenticated}
              token={token}
              user={user}
              component={AllTransactions}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
