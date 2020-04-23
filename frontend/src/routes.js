import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const FollowUp = React.lazy(() => import('./views/FollowUp'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/follow-up', name: 'FollowUp', component: FollowUp },
];

export default routes;
