import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Analytics = React.lazy(() => import('./views/analytics/Analytics'))
const Favorites = React.lazy(() => import('./views/favorites/Favorites'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/analytics', name: 'Analytics', element: Analytics },
  { path: '/favorites', name: 'Favorites', element: Favorites },
]

export default routes
