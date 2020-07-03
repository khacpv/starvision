import React from 'react';

const AdminNotification = React.lazy(() => import("./views/Pages/AdminNotification/AdminNotification"));
const AdminDashboard = React.lazy(() => import( "./views/Pages/AdminDashboard/AdminDashboard"));
const AdminLense = React.lazy(() => import( "./views/Pages/AdminLense/AdminLense"));
const DetailOrder = React.lazy(() => import( "./views/Pages/AdminLense/DetailOrder"));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Notification = React.lazy(() => import('./views/Notifications/Notification'));
const Summary = React.lazy(() => import('./views/Pages/Summary'));
const LensePrice = React.lazy(() => import('./views/Pages/LensePrice'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/notifications', name: 'Notification', component: Notification },
  { path: '/summary', name: 'Summary', component: Summary },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/adminNotification', name: 'AdminNotification', component: AdminNotification },
  { path: '/adminLense', name: 'AdminLense', component: AdminLense },
  { path: '/detailOrderLense', name: 'detailOrderLense', component: DetailOrder },
  { path: '/lensePrice', name: 'lensePrice', component: LensePrice },
];

export default routes;
