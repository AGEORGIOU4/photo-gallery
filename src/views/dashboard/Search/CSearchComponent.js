import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CPhoto from './components/CPhoto';
import { getColumnCount } from '../helpers';
import { CBadge, CButton, CCol, CForm, CFormInput, CImage, CRow, } from '@coreui/react-pro';
import unsplashLogo from '../../../assets/images/other/unsplash_logo.png';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import { server_url, unsplash_url, word_associations_url } from 'src/common/urls';
import { restApiGet, restApiPost } from 'src/common/apis';
import CLightbox from '../LightBox/CLightbox';
import { useAuth0 } from '@auth0/auth0-react';


let tmp_query = "Random"

export const CSearchComponent = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [aiLoading, setAILoading] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false)

  const [query, setQuery] = useState('Random');
  const [photos, setPhotos] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedPhoto, setSelectedPhoto] = useState({});

  const [associations, setAssociations] = useState([]);

  const [columns, setColumns] = useState(getColumnCount(window.innerWidth));

  const handleClick = (e) => {
    setSelectedPhoto(e.target.dataset)
    setShowLightbox(!showLightbox)
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      // User has scrolled to the bottom of the page
      if (page < totalPages) {
        setPage(page + 1);
      }
    }
  };

  const fetchPhotos = async (form = false) => {
    setLoading(true);

    let word = tmp_query
    if (form) {
      word = query
    }
    try {
      await restApiGet(`${unsplash_url}/search/photos?page=${page}&query=${word}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`).then((result) => {
        if (result?.results) {
          setPhotos(prevPhotos => [...prevPhotos, ...result?.results]);
          setTotalPages(result?.total_pages || 0);
        }
      }).catch((e) => {
        setTotalPages(0);
        console.error(e)
      })
    } catch (error) {
      setTotalPages(0);
      console.error('Error fetching photos:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);

    }
  };

  const fetchAssociations = async () => {
    setAILoading(true)
    let word = query || "random";
    let tmp_items = []

    try {
      await restApiGet(`${word_associations_url}/search?apikey=${process.env.REACT_APP_WORD_ASSOCIATIONS_KEY}&text=${word}&lang=en&type=stimulus&limit=6`)
        .then((result) => {
          if (result && result?.response) {
            tmp_items = result.response[0].items || []
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (error) {
      console.error('Error fetching assocation:', error);
    } finally {
      const loader = Math.floor(Math.random() * (2500 - 300 + 1)) + 300;

      setTimeout(() => {
        setAILoading(false)
        setAssociations(tmp_items)
      }, loader);
    }
  };

  const saveSearch = async () => {
    if (isAuthenticated) {
      let userId = user?.sub.split('|')[1];
      let body = { userId: userId, keywords: query } || {}

      try {
        await restApiPost(`${server_url}/api/v1/search/create`, body).then((result) => {
          if (result) {
            console.log(result)
          }
        }).catch((e) => {
          console.error(e)
        })
      } catch (error) {
        console.error('Error saving keyword:', error);
      } finally {
        console.log("Saved")
      }
    }
  };

  const handleQuery = (e) => {
    e.preventDefault()
    setPhotos([])
    fetchPhotos()
    setAssociations([])
    fetchAssociations()
    saveSearch()
  }

  const handleBadgeClick = (e) => {
    setQuery(e.target.innerText)
    tmp_query = e.target.innerText
    handleQuery(e)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setPhotos([])
    fetchPhotos(true)
    setAssociations([])
    fetchAssociations()
    saveSearch()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, totalPages]); // Include page and totalPages in the dependency array

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  useEffect(() => {
    fetchAssociations()
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnCount(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <CLightbox setVisible={setShowLightbox} visible={showLightbox} data={selectedPhoto} />
      {/* Section 1 - Search Input */}
      <CForm onSubmit={handleFormSubmit}>
        <CRow>
          <CCol lg={12} md={12} className="position-relative">
            <button className="search-button" onClick={handleFormSubmit}>
              <i className="fas fa-search"></i>
            </button>
            <CFormInput
              autoComplete="off"
              className="main-search-bar"
              placeholder="Search images"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocusCapture={(e) => setQuery('')}
            />
            <div className="divider"></div>
          </CCol>
          {/* <CCol lg={1} md={2}>
            <CButton color={"dark"} variant='outline' className='main-search-btn' onClick={handleFormSubmit}> <CIcon icon={cilMagnifyingGlass} size='lg' />
            </CButton>
          </CCol> */}
          {/* <br />
          <CCol md={12} className='text-center'>
            <CButton color={"dark"} variant='outline' className='main-search-btn-mobile' onClick={handleFormSubmit}><CIcon icon={cilMagnifyingGlass} size='lg' />
            </CButton>
          </CCol> */}
        </CRow>
      </CForm>

      {/* Section 2 - Search Results */}
      <div style={{ opacity: loading ? 0.4 : 1, padding: '10px 0' }}>
        {totalPages > 0 &&
          <CRow className="d-flex justify-content-center ">
            <CCol className='suggestions-section' md={10} style={{ display: 'flex', alignItems: 'center' }}>
              <span
                className={aiLoading ? 'blink' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#673ab7',
                  fontSize: 'small'
                }}
              >
                <CImage src={'/ai_star.png'} style={{ width: '30px', marginRight: '10px', marginBottom: '20px' }} />
                AI Assistant suggests...
              </span>
              <div className='suggestions-badges' >
                {associations?.map((association, index) => (
                  <CBadge
                    key={index}
                    className='badge-btn'
                    shape='rounded-pill'
                    color='info'
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      margin: '5px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: 'smaller'
                    }}
                    value={association.item}
                    onClick={handleBadgeClick}
                  >
                    {association.item}
                  </CBadge>
                ))}
              </div>
            </CCol>
            <CCol md={2} style={{ textAlign: 'end' }}>
              <p className='powered-p' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333', fontSize: 'initial' }}>
                <span style={{ fontSize: 'smaller', textAlign: 'end', width: '100%' }}>Powered by</span>
                <img src={unsplashLogo} height={60} alt="Unsplash Logo" className="ms-3 " />
              </p>
            </CCol>
            <hr style={{ height: '5px', marginBottom: '0' }} />
            <CRow xs={{ cols: 1 }} md={{ cols: columns }} className="g-4 results-row" style={{ placeContent: 'center' }}>
              {photos?.map((photo, index) => (
                <CPhoto
                  key={index}
                  id={photo?.id}
                  src={photo.urls?.thumb}
                  author={photo.user?.name}
                  title={photo.title || ""}
                  description={photo.description || ""}
                  alt_description={photo.alt_description || ""}
                  regular={photo.urls?.regular || ""}
                  created_at={photo?.created_at || ""}
                  user={photo?.user || {}}
                  handleClick={handleClick}
                />
              ))}
            </CRow>
          </CRow>
        }
        <div className='text-center'>
          <br />
          {totalPages === 0 && <h1 style={{ padding: '5rem 1rem', color: '#a1a1a1' }}><strong>No items found</strong></h1>}
        </div>
      </div>
      <br />
    </>
  );
};

// Prop validation
CSearchComponent.propTypes = {
  handleClick: PropTypes.func,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      urls: PropTypes.object,
      user: PropTypes.object,
      title: PropTypes.string,
      description: PropTypes.string,
      alt_description: PropTypes.string,
    })
  ),
};
