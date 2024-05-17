import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react-pro'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const dispatch = useDispatch()

  const sidebarShow = useSelector((state) => state.sidebarShow)
  // const asideShow = useSelector((state) => state.asideShow)

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      if (scrollTop > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setRotation(sidebarShow ? 135 : 0)
  }, [sidebarShow])

  const [rotation, setRotation] = useState(0)

  const toggleRotation = () => {
    // Calculate the new rotation value based on the current rotation
    const newRotation = rotation === 135 ? 0 : 135
    setRotation(newRotation)
  }

  return (
    <CHeader position="sticky" className={isScrolled ? 'header scrolled mb-4' : 'header mb-4'}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <img
            onClick={toggleRotation}
            src="logo.png"
            id="header-logo"
            height={40}
            alt="Logo"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              <h6 style={{ fontWeight: '900', marginBottom: '0' }}>Click</h6>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
