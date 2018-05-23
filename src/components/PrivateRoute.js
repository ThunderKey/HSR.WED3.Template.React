// @flow

import React from "react";
import { Route, Redirect } from "react-router-dom";
import type { User } from '../api';

type Props = {
  component: any,
  isAuthenticated: boolean,
  user: ?User,
  token: ?string,
};

function PrivateRoute({ component, isAuthenticated, user, token, ...rest } : Props) {
  if (isAuthenticated && user && token) {
    // if the user is authenticated, just render the component
    return (
      <Route
        {...rest}
        render={props =>
          React.createElement(component, { ...props, user, token })
        }
      />
    );
  }
  // otherwise redirect to the login page
  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )}
    />
  );
}

export default PrivateRoute;
