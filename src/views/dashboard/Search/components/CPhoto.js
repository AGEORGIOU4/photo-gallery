import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { CCard, CCardImage, CCol, CTooltip } from '@coreui/react-pro';

const CPhoto = (props) => {
  const [showAuthor, setShowAuthor] = useState(false);
  console.log(showAuthor)
  return (
    <>
      <CCol xs>
        <CCard className="h-100">
          <CTooltip
            content={props.author}
            placement="top"
          >
            <CCardImage
              orientation="top"
              src={props.src}
              className='result-image'
              onMouseOver={() => setShowAuthor(true)}
              onMouseOut={() => setShowAuthor(true)}
            />
          </CTooltip>
        </CCard>
      </CCol>
    </>
  );
};

// Prop validation
CPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CPhoto;
