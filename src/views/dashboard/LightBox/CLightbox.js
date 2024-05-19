import React from 'react';
import PropTypes from 'prop-types';
import { CModal, CModalHeader, CModalBody, CRow, CCol, CButton } from '@coreui/react-pro';
import { FormatTimestampDateTime, } from 'src/common/functions';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';
import { restApiDelete, restApiPost } from 'src/common/apis';
import { server_url } from 'src/common/urls';
import { useAuth0 } from "@auth0/auth0-react";

const CLightBox = ({ visible, setVisible, data, showRemove = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const savePhoto = async () => {
    if (isAuthenticated) {
      let userId = user?.sub.split('|')[1];
      let body = { id: data.id, info: data, userId: userId } || {}

      try {
        await restApiPost(`${server_url}/api/v1/photo/create`, body).then((result) => {
          if (result) {
            console.log(result)
          }
        }).catch((e) => {
          console.error(e)
        })
      } catch (error) {
        console.error('Error saving photo:', error);
      } finally {
        console.log("Saved")
        setVisible(false)
      }
    }
  };

  const handleSave = () => {
    savePhoto()
  }

  const removePhoto = async () => {
    if (isAuthenticated) {
      let id = data.id;
      let userId = user?.sub.split('|')[1];
      let body = { id: id, userId: userId } || {}

      try {
        await restApiDelete(`${server_url}/api/v1/photo/delete`, body).then((result) => {
          console.log(body)
          if (result) {
            console.log(result)
          }
        }).catch((e) => {
          console.error(e)
        })
      } catch (error) {
        console.error('Error saving photo:', error);
      } finally {
        console.log("Removed")
        setVisible(false)
      }
    }
  };

  const handleRemove = () => {
    removePhoto()
  }


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
            <CButton onClick={showRemove ? handleRemove : handleSave} variant='ghost' color='light' style={{ width: '100%' }}>{showRemove ? "Remove" : "Save"} <CIcon icon={cilSave} /></CButton>
            {/* <CButton onClick={handleSave} variant='ghost' color='light' style={{ width: '100%' }}>{showRemove ? "Remove" : "Save"} <CIcon icon={cilSave} /></CButton> */}
            <hr className='white-hr' />
          </CCol>
        </CRow>

      </CModalBody>
    </CModal>
  );
};

CLightBox.propTypes = {
  visible: PropTypes.bool,
  showRemove: PropTypes.bool,
  setVisible: PropTypes.func,
  data: PropTypes.object,

};

export default React.memo(CLightBox);
