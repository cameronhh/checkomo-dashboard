// src/router/_private.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { state } from '../api';

const FALLBACK = '/';

export const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!state.logged) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: FALLBACK,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
