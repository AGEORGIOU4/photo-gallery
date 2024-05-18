import React from 'react'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle, CSpinner } from '@coreui/react-pro'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import CIcon from '@coreui/icons-react';
import { cilArrowCircleLeft, cilArrowCircleRight, cilSave, cilUser, cilWindowRestore } from '@coreui/icons';
import avatar from "../../assets/images/avatars/avatar.png"

const AppHeaderDropdown = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <div style={{ display: isLoading ? "block" : "none", padding: "0 1.13rem" }}>
        <CSpinner color="primary" />
      </div>

      <div style={{ display: !isLoading ? "block" : "none" }}>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated &&
          <CDropdown variant="nav-item" alignment="end">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={true}>
              <CAvatar status={'success'} referrerPolicy="no-referrer" shape='rounded-end' src={(isAuthenticated) ? user.picture : avatar} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0">
              <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
              <CDropdownItem href="#/profile">
                <CIcon icon={cilUser} className="me-2" />
                Profile
              </CDropdownItem>
              <CDropdownItem href="#/profile">
                <CIcon icon={cilSave} className="me-2" />
                Saved
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem onClick={() => loginWithRedirect()} style={{ display: !isAuthenticated ? "block" : "none" }}>
                <CIcon icon={cilArrowCircleRight} className="me-2" />
                Login
              </CDropdownItem>
              <CDropdownItem onClick={() => logout()} style={{ display: isAuthenticated ? "block" : "none" }}>
                <CIcon icon={cilArrowCircleLeft} className="me-2" />
                Logout
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>}
      </div>
    </div>
  )
}


export default AppHeaderDropdown
