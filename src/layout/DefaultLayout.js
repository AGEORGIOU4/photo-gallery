import React from 'react'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useLocation } from 'react-router-dom';

const DefaultLayout = () => {
  const location = useLocation();

  // Function to check if the user is on the profile page
  const isProfilePage = () => {
    return location.pathname === '/profile'; // Change '/profile' to your actual profile page path
  };

  return (
    <>
      <AppSidebar />
      <div className={`wrapper d-flex flex-column min-vh-100 ${isProfilePage() ? 'profile-photo' : 'back-photo'}`}>
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <br />
        <br />
        <br />
        <AppFooter />
      </div>
      <AppAside />
    </>
  )
}

export default DefaultLayout
