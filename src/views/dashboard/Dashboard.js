import React, { useEffect, useState } from 'react'
import { CCol, CContainer, CFormInput, CRow } from '@coreui/react-pro'

const Dashboard = () => {
  const [text, setText] = useState('')
  const fullText = 'Explore Captivating Moments on '

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <CContainer fluid className="home-container">
        <div className="d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="text-center">
              <h1 className="typewriter">
                {text}
                <span className="highlight-text">Click</span>
              </h1>
              <CCol>
                <CFormInput
                  placeholder="Search for Art"
                  autoComplete="off"
                  className="main-search-bar"
                />
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </CContainer>
    </>
  )
}

export default Dashboard
