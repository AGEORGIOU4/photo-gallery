import React, { useEffect, useState } from 'react';
import { CButton, CCol, CContainer, CForm, CFormInput, CRow, } from '@coreui/react-pro';
import unsplashLogo from '../../assets/images/other/unsplash_logo.png';
import { SearchResults } from './Search/SearchResults';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import { unsplash_url } from 'src/common/urls';
import { restApiGet } from 'src/common/apis';
import { typewriterEffect } from './helpers';
import CLightbox from './LightBox/CLightbox';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false)

  const [pageTitle, setText] = useState('');

  const [query, setQuery] = useState('Random');
  const [photos, setPhotos] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedPhoto, setSelectedPhoto] = useState({});

  const handleClick = (e) => {
    setSelectedPhoto(e.target.dataset)
    setVisible(!visible)
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      // User has scrolled to the bottom of the page
      if (page < totalPages) {
        setPage(page + 1);
      }
    }
  };

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      await restApiGet(`${unsplash_url}/search/photos?page=${page}&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`).then((result) => {
        if (result?.results) {
          setPhotos(prevPhotos => [...prevPhotos, ...result?.results]);
          setTotalPages(result?.total_pages || 0);
        } else {
          alert("Oops. You have reached the rate limit!")
          window.location.reload()
        }
      }).catch((e) => {
        console.error(e)
      })
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);

    }
  };

  const handleQuery = (e) => {
    e.preventDefault()
    setPhotos([])
    fetchPhotos()
  }

  useEffect(() => {
    typewriterEffect('Explore Captivating Moments on ', setText);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, totalPages]); // Include page and totalPages in the dependency array


  useEffect(() => {
    fetchPhotos();
  }, [page]);

  return (
    <CContainer fluid className="home-container">
      <div className="d-flex flex-row align-items-center">
        <CContainer>
          {/* Modal */}
          <CLightbox setVisible={setVisible} visible={visible} data={selectedPhoto} />
          {/* Section 1 - Title & Search Bar */}
          <CRow className="text-center">
            <h1 className="typewriter">
              {pageTitle}
              <span className="highlight-text">Click</span>
            </h1>
            <CForm onSubmit={handleQuery}>
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
            </CForm>
          </CRow>
          <br />
          <hr />
          {/* Section 2 - Search Results */}
          <div style={{ opacity: loading ? 0.4 : 1 }}>
            {totalPages > 0 &&
              <CRow className="d-flex justify-content-center unsplash-div">
                <h6 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333' }}>
                  <span>Powered by</span>
                  <img src={unsplashLogo} height={80} alt="Unsplash Logo" className="ms-3 me-3" />
                </h6>
                <SearchResults photos={photos} handleClick={handleClick} />
              </CRow>
            }
            <div className='text-center'>
              <br />
              {totalPages === 0 && <h1><strong>No items found</strong></h1>}
            </div>
          </div>
          <br />
        </CContainer>
      </div >
    </CContainer >
  );
};

export default Dashboard;
