import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { VenuePrompt } from '../components';

import { state } from '../api';

const FALLBACK = '/login';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (state.logged) {
          if (!state.hasSelectedVenue) {
            return <VenuePrompt />;
          } else {
            return <Component {...props} />;
          }
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
