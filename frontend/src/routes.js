import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts/Alerts'));
const Summary = React.lazy(() => import('./views/Pages/Summary'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/notifications', name: 'Notification', component: Alerts },
  { path: '/summary', name: 'Summary', component: Summary },
];

export default routes;
