import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { isValidElementType } from 'react-is';

import getUrl from '../getUrl';

const ConditionalRoute = withRouter(function ({
  condition, // boolean function(props) or boolean
  redirectTo, // string function(props) or string
  redirectData = {}, // object function(props) or object
  reason, // string function(props) or string
  component: Component, // jsx function(props) or jsx
  children,
  render,
  ...rest // pass directly to Route https://reacttraining.com/react-router/web/api/Route
}) {
  if (condition === undefined) {
    throw new Error(
      'Route must have a condition (boolean function(props) or boolean).'
    );
  } else if (typeof condition === 'function') {
    if (redirectTo === undefined) {
      throw new Error(
        'Route with a function condition prop must have a redirectTo (string function(props) or string), too.'
      );
    }
  } else {
    condition = Boolean(condition);
  }

  if (condition === undefined) {
    throw new Error(
      'Route must have a condition (boolean function(props) or boolean).'
    );
  } else if (typeof condition === 'function') {
    if (redirectTo === undefined) {
      throw new Error(
        'Route with a function condition prop must have a redirectTo (string function(props) or string), too.'
      );
    }
  } else {
    condition = Boolean(condition);
  }

  if (redirectTo !== undefined && typeof redirectTo !== 'function') {
    redirectTo = String(redirectTo);
  }

  if (reason !== undefined && typeof reason !== 'function') {
    reason = String(reason);
  }

  if (!isValidElementType(Component)) {
    throw new Error('Route must have a valid component.');
  }

  return (
    <Route
      {...rest}
      render={props =>
        condition === true ||
        (typeof condition === 'function' && condition(props) === true) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: getUrl(
                typeof redirectTo === 'function'
                  ? redirectTo(props)
                  : redirectTo,
                typeof redirectData === 'function'
                  ? redirectData(props)
                  : redirectData
              ),
              state: {
                from: props.location,
                reason: typeof reason === 'function' ? reason(props) : reason,
              },
            }}
          />
        )
      }
    />
  );
});

export default ConditionalRoute;
