import React, { lazy } from 'react';
import { Switch, BrowserRouter, Route as DefaultRoute } from 'react-router-dom';

import Route from './route';

import getPath from './helpers/getPath';

// Prepare route dictionary ----------------------------------------------------

export const routes = new Map([
  ['home', ['/', '/home']], // name => path (string or array of strings)
  ['login', '/login'],
  ['home2', '/home2'],
]);
export const inverseRoutes = new Map();

routes.forEach((value, key) => {
  if (Array.isArray(value)) for (const i of value) inverseRoutes.set(i, key);
  else inverseRoutes.set(value, key);
});

// End prepare route dictionary ------------------------------------------------

function Router() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route.NormalRoute
          path={getPath('home', 1)}
          exact
          component={lazy(() =>
            import('views/Home' /* webpackChunkName: "home" */)
          )}
        />
        <Route.RedirectRoute
          path={getPath('home2', 1)}
          exact
          to={getPath('home')}
        />
        <Route.ConditionalRoute
          path={getPath('login', 1)}
          exact
          component={lazy(() =>
            import('views/Login' /* webpackChunkName: "login" */)
          )}
          condition={props => {
            return true;
          }}
          reason={"Don't have permission"}
          redirectTo={getPath('home')}
          redirectData={function (props) {
            console.log(props);
          }}
        />
      </Switch>
    </React.Suspense>
  );
}

export default {
  Router,
  Provider: BrowserRouter,
};

export { Router, BrowserRouter as Provider };
