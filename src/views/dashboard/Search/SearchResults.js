import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { CRow } from '@coreui/react-pro';
import CPhoto from './components/CPhoto';

export const SearchResults = (props) => {
  return (
    <>
      <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="g-4" style={{ placeContent: 'center' }}>
        {props.photos?.map((photo, index) => {
          return (
            <CPhoto key={index} src={photo.urls?.thumb} author={photo.user?.name} width={photo.width} height={photo.height} />
          );
        })}
      </CRow>

    </>
  );
};

// Prop validation
SearchResults.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      urls: PropTypes.object,
      user: PropTypes.object,
      title: PropTypes.string,
      description: PropTypes.string,
      alt_description: PropTypes.string,
    })
  ),
};
