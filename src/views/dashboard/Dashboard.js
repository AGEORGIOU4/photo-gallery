import React from 'react';
import { CContainer } from '@coreui/react-pro';
import { CSearchComponent } from './Search/CSearchComponent';
import { CTitle } from './Search/components/CTitle';

const Dashboard = () => {
  return (
    <CContainer fluid className="home-container">
      <div className="d-flex flex-row align-items-center">
        <CContainer>
          <CTitle />
          <CSearchComponent />
        </CContainer>
      </div >
    </CContainer >
  );
};

export default Dashboard;
