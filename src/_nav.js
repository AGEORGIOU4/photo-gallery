import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibGoogleAnalytics,
  cilHome,
  cilSpeedometer,
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
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Analytics',
    to: '/analytics',
    icon: <CIcon icon={cibGoogleAnalytics} customClassName="nav-icon" />,
  },
]

export default _nav
