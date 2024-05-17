import React from 'react';
import PropTypes from 'prop-types';
import { CModal, CModalHeader, CModalBody, CRow, CCol, CButton } from '@coreui/react-pro';
import { FormatTimestampDateTime, } from 'src/common/functions';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';

const CLightBox = ({ visible, setVisible, data }) => {
  return (
    <CModal size="xl" visible={visible} onClose={() => setVisible(false)} aria-labelledby="OptionalSizesExample2">
      <CModalHeader closeButton>
        {/* <CModalTitle style={{ color: 'black', fontWeight: '900' }} id="OptionalSizesExample2">Alt Description: {data?.alt_description || ""}</CModalTitle> */}
      </CModalHeader>
      <CModalBody>
        {/* Render your image and description here */}
        <CRow>
          <CCol md={8} style={{ marginBottom: '20px' }}>
            <img className='lightbox-image' src={data?.srcRegular || ""} alt={data?.alt_description || ""} />
          </CCol>
          <CCol md={4}>
            <p><strong>Author:</strong> {data?.author}</p>
            <p><strong>ID:</strong> {data?.id}</p>
            <p><strong>Description:</strong> {data?.description}</p>
            <p><strong>Alt:</strong> {data?.alt_description}</p>
            <p><strong>Created at:</strong> <FormatTimestampDateTime date={data?.createdAt} /></p>
            <p><strong>Source:</strong> <a href={data?.srcRegular}>Link</a></p>
            <hr className='white-hr' />
            <CButton variant='ghost' color='light' style={{ width: '100%' }}>Save <CIcon icon={cilSave} /></CButton>
            <hr className='white-hr' />
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
