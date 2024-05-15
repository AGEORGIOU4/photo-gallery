import React from 'react'
import { CButtonGroup, CFooter, CFormCheck } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMoon, cilSun } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'

const AppFooter = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  return (
    <CFooter>
      {/* <div>
        <CButtonGroup aria-label="Theme switch">
          <CFormCheck
            type="radio"
            button={{ color: 'primary' }}
            name="theme-switch"
            id="btn-light-theme"
            autoComplete="off"
            label={<CIcon icon={cilSun} />}
            checked={theme === 'default'}
            onChange={() => dispatch({ type: 'set', theme: 'light' })}
          />
          <CFormCheck
            type="radio"
            button={{ color: 'primary' }}
            name="theme-switch"
            id="btn-dark-theme"
            autoComplete="off"
            label={<CIcon icon={cilMoon} />}
            checked={theme === 'dark'}
            onChange={() => dispatch({ type: 'set', theme: 'dark' })}
          />
        </CButtonGroup>
      </div> */}
      <div className="ms-auto">
        <span className="me-1">Created by</span>
        <a href="https://www.linkedin.com/in/ageorgiou4/" target="_blank" rel="noopener noreferrer">
          Andreas Georgiou
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
