import React from 'react';
import isAuthenticated from 'auth/helpers/isAuthenticated';
import ConditionalRoute from './ConditionalRoute';

export default function GuestRoute({ ...rest }) {
  const config = {
    ...rest,
    condition: () => !isAuthenticated(),
    redirectTo: '/',
    reason: '',
  };

  return <ConditionalRoute {...config} />;
}
