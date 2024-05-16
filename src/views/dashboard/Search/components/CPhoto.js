import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { CCard, CCardImage, CCol, CTooltip } from '@coreui/react-pro';

const CPhoto = (props) => {
  return (
    <>
      <CCol xs>
        <CCard className="h-100">
          <CTooltip
            content={props.author}
            placement="top"
          >
            <CCardImage
              id={props.id}
              data-id={props.id}
              data-author={props.author}

              data-title={props.title}
              data-description={props.description}
              data-alt_description={props.alt_description}
              data-src-regular={props.regular}
              data-created-at={props.created_at}
              orientation="top"
              src={props.src}
              className='result-image'
              onClick={props.handleClick}
            />
          </CTooltip>
        </CCard>
      </CCol>
    </>
  );
};

// Prop validation
CPhoto.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  alt_description: PropTypes.string,
  regular: PropTypes.string,
  created_at: PropTypes.string,
  handleClick: PropTypes.func,
};

export default CPhoto;
