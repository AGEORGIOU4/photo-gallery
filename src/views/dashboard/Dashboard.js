import React, { useEffect, useState, useRef } from 'react';
import { CButton, CCol, CContainer, CFormInput, CLoadingButton, CPagination, CPaginationItem, CRow } from '@coreui/react-pro';
import unsplashLogo from '../../assets/images/other/unsplash_logo.png';
import { SearchResults } from './Search/SearchResults';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import { unsplash_url } from 'src/common/urls';
import { restApiGet } from 'src/common/apis';
import { typewriterEffect } from './helpers';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [pageTitle, setText] = useState('');

  const [query, setQuery] = useState('Random');
  const [photos, setPhotos] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const result = await restApiGet(`${unsplash_url}/search/photos?page=${page}&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`);
      setPhotos(prevPhotos => [...prevPhotos, ...result?.results]); // Append new photos to existing ones
      setTotalPages(result?.total_pages || 0);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = (e) => {
    setPhotos([])
    fetchPhotos()
  }

  useEffect(() => {
    typewriterEffect('Explore Captivating Moments on ', setText);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        if (page < totalPages) {
          setPage(page + 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, totalPages]);

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  return (
    <CContainer fluid className="home-container">
      <div className="d-flex flex-row align-items-center">
        <CContainer>
          {/* Section 1 - Title & Search Bar */}
          <CRow className="text-center">
            <h1 className="typewriter">
              {pageTitle}
              <span className="highlight-text">Click</span>
            </h1>
            <CRow>
              <CCol md={11}>
                <CFormInput
                  autoComplete="off"
                  className="main-search-bar"
                  placeholder="Search Anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocusCapture={(e) => setQuery("")}
                />
              </CCol>
              <CCol md={1}>
                <CButton className='main-search-btn' onClick={handleQuery}> <CIcon icon={cilMagnifyingGlass} size='lg' />
                </CButton>
              </CCol>
              <br />
              <CCol md={12} className='text-center'>
                <CButton className='main-search-btn-mobile'><CIcon icon={cilMagnifyingGlass} size='lg' />
                </CButton>
              </CCol>
            </CRow>
          </CRow>
          <br />
          <hr />
          {/* Section 2 - Search Results */}
          <div style={{ opacity: loading ? 0.4 : 1 }}>
            <CRow className="d-flex justify-content-center unsplash-div">
              <h6 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333' }}>
                <span>Powered by</span>
                <img src={unsplashLogo} height={80} alt="Unsplash Logo" className="ms-3 me-3" />
              </h6>
              <SearchResults photos={photos} />
            </CRow>
          </div>
          <br />
        </CContainer>
      </div >
    </CContainer >
  );
};

export default Dashboard;
