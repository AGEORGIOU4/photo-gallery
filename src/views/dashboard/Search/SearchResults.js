import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { CRow } from '@coreui/react-pro';
import CPhoto from './components/CPhoto';

export const SearchResults = (props) => {
  return (
    <>
      <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="g-4" style={{ placeContent: 'center' }}>
        {props.photos?.map((photo, index) => {
          console.log(photo)
          return (
            <CPhoto
              key={index}
              id={photo?.id}
              src={photo.urls?.thumb}
              author={photo.user?.name}
              title={photo.title || ""}
              description={photo.description || ""}
              alt_description={photo.alt_description || ""}
              regular={photo.urls?.regular || ""}
              created_at={photo?.created_at || ""}
              handleClick={props.handleClick}
            />
          );
        })}
      </CRow>

    </>
  );
};

// Prop validation
SearchResults.propTypes = {
  handleClick: PropTypes.func,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      urls: PropTypes.object,
      user: PropTypes.object,
      title: PropTypes.string,
      description: PropTypes.string,
      alt_description: PropTypes.string,
    })
  ),
};
