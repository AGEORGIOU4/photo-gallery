import React from 'react';
import { CContainer } from '@coreui/react-pro';
import { CSearchComponent } from './Search/CSearchComponent';
import { CTitle } from './Search/components/CTitle';
import { cilHome } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const Dashboard = () => {
  return (
    <CContainer fluid className="home-container">
      <div className="d-flex flex-row align-items-center">

        <CContainer>
          <p><strong>Home <CIcon icon={cilHome} /></strong></p>
          <CTitle />
          <CSearchComponent />
        </CContainer>
      </div >
    </CContainer >
  );
};

export default Dashboard;
