import React from 'react';

const AdminNotification = React.lazy(() => import("./views/Pages/AdminNotification/AdminNotification"));
const AdminDashboard = React.lazy(() => import( "./views/Pages/AdminDashboard/AdminDashboard"));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Notification = React.lazy(() => import('./views/Notifications/Notification'));
const Summary = React.lazy(() => import('./views/Pages/Summary'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/notifications', name: 'Notification', component: Notification },
  { path: '/summary', name: 'Summary', component: Summary },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/adminNotification', name: 'AdminNotification', component: AdminNotification },
];

export default routes;
