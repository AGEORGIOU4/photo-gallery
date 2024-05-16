import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CModal, CModalHeader, CModalTitle, CModalBody, CRow, CCol } from '@coreui/react-pro';
import { FormatTimestamp, FormatTimestampDateTime, FormatTimestampWithDate } from 'src/common/functions';

const CLightBox = ({ visible, setVisible, data }) => {
  const [loading, setLoading] = useState(true);
  console.log(data)
  return (
    <CModal size="xl" visible={visible} onClose={() => setVisible(false)} aria-labelledby="OptionalSizesExample2">
      <CModalHeader closeButton>
        {/* <CModalTitle style={{ color: 'black', fontWeight: '900' }} id="OptionalSizesExample2">Alt Description: {data?.alt_description || ""}</CModalTitle> */}
      </CModalHeader>
      <CModalBody>
        {/* Render your image and description here */}
        <img className='lightbox-image' src={data?.srcRegular || ""} alt={data?.alt_description || ""} />
        <br />
        <br />
        <CRow>
          <CCol md={6}>
            <p><strong>Author:</strong> {data?.author}</p>
            <p><strong>ID:</strong> {data?.id}</p>
            <p><strong>Description:</strong> {data?.description}</p>
          </CCol>
          <CCol md={6}>
            <p><strong>Alt:</strong> {data?.alt_description}</p>
            <p><strong>Created at:</strong> <FormatTimestampDateTime date={data?.createdAt} /></p>
            <p><strong>Source:</strong> <a href={data?.srcRegular}>Link</a></p>
          </CCol>
        </CRow>

      </CModalBody>
    </CModal>
  );
};

CLightBox.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  data: PropTypes.object,
};

export default React.memo(CLightBox);
