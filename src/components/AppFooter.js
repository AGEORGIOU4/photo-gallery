import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {

  return (
    <CFooter>
      <div>
      </div>
      <div className="ms-auto">
        <span className="me-1" style={{ fontSize: 'x-small' }}>Crafted by</span>
        <a href="https://www.linkedin.com/in/ageorgiou4/" style={{ textDecoration: 'none', fontSize: 'smaller' }} target="_blank" rel="noopener noreferrer">
          Andreas Georgiou
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
