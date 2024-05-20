import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibGoogleAnalytics,
  cilHome,
  cilLayers,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Profile',
  //   to: '/profile',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Analytics',
    to: '/analytics',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Favorites',
    to: '/favorites',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
]

export default _nav
