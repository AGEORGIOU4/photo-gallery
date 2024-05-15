import React from 'react'
import {
  CCol,
  CContainer,
  CImage,
  CRow,
} from '@coreui/react-pro'
export const CLoading = (props) => {

  return (
    <div>
      <CContainer style={{ textAlign: 'center' }}>
        <CRow>
          <CCol style={{ paddingTop: '100px' }}>
            <CImage src='loading-bars.gif' height={100} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

