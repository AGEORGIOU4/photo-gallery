import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CImage } from '@coreui/react-pro';

const CPhoto = (props) => {
  const {
    id,
    src,
    author,
    title,
    description,
    alt_description,
    regular,
    created_at,
    user,
    handleClick
  } = props;

  const commonProps = {
    id,
    'data-id': id,
    'data-author': author,
    'data-title': title,
    'data-description': description,
    'data-alt_description': alt_description,
    'data-src-regular': regular,
    'data-created-at': created_at,
    'data-user': JSON.stringify(user),
    onClick: handleClick,
  };

  return (
    <CCol xs  {...commonProps}>
      <div className="result-image-container" {...commonProps}>
        <CImage
          {...commonProps}
          src={src}
          className='result-image'
        />
        <div className="overlay" {...commonProps}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0.4rem' }}  {...commonProps}>
            <CImage
              src={user?.profile_image?.small || ""}
              alt={author}
              className="profile-picture"
              {...commonProps}
            />
            <span style={{ fontSize: 'x-small', marginLeft: '0.5rem' }} {...commonProps}>{user?.username || ""}</span>
          </div>
        </div>
      </div>
    </CCol>
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
  user: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
};

export default CPhoto;
