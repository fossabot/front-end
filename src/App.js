import React, { lazy } from 'react';
import { Switch, BrowserRouter, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as Route from 'utils/router/routes';

import getPath from 'utils/router/helpers/getPath';
import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import isAuthenticatedSelector from 'auth/recoil/selectors/isAuthenticated';

// Prepare route dictionary ----------------------------------------------------
export const routes = new Map([
  ['home', ['/', '/home']], // name => path (string or array of strings)
  ['auth', '/auth'],
]);
export const inverseRoutes = new Map();

routes.forEach((value, key) => {
  if (Array.isArray(value)) for (const i of value) inverseRoutes.set(i, key);
  else inverseRoutes.set(value, key);
});

// End prepare route dictionary ------------------------------------------------

function App() {
  // const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  // const history = useHistory();

  // React.useEffect(() => {
  //   if (isAuthenticated === false) history.push('/auth/login');
  // }, [history, isAuthenticated]);

  return (
    <React.Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route.PrivateRoute
          path={getPath('home', 1)}
          exact
          component={lazy(() =>
            import('views/Home' /* webpackChunkName: "home" */)
          )}
        />
        <Route.GuestRoute
          path={getPath('auth', 1)}
          component={lazy(() =>
            import('views/Auth' /* webpackChunkName: "auth" */)
          )}
        />
        <Route.NormalRoute
          component={lazy(() =>
            import('views/errors/NotFound' /* webpackChunkName: "notFound" */)
          )}
        />
      </Switch>
    </React.Suspense>
  );
}

export default App;

export { BrowserRouter as Provider };
