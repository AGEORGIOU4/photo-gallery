import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { CCard, CCardImage, CCol } from '@coreui/react-pro';

const CPhoto = (props) => {
  return (
    <>
      <CCol xs>
        <CCard className="h-100">
          <CCardImage
            orientation="top"
            src={props.src}
            className='result-image'
          />
        </CCard>
      </CCol>
    </>
  );
};

// Prop validation
CPhoto.propTypes = {
  src: PropTypes.string.isRequired,
};

export default CPhoto;
