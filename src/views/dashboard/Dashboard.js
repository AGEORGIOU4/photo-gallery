import React, { useEffect, useState } from 'react';
import { CBadge, CButton, CCol, CContainer, CForm, CFormInput, CImage, CRow, } from '@coreui/react-pro';
import unsplashLogo from '../../assets/images/other/unsplash_logo.png';
import { SearchResults } from './Search/SearchResults';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import { api_ninjas_url, unsplash_url } from 'src/common/urls';
import { restApiGet } from 'src/common/apis';
import { typewriterEffect } from './helpers';
import CLightbox from './LightBox/CLightbox';

let tmp_query = "Random"

const Dashboard = () => {
  const [aiLoading, setAILoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false)

  const [pageTitle, setText] = useState('');

  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedPhoto, setSelectedPhoto] = useState({});

  const [synonyms, setSynonyms] = useState([]);

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

  const fetchSynonyms = async () => {
    setAILoading(true)
    let word = query || "random";
    const headers = {
      'X-Api-Key': 'kCVCZGwLehNyuXnhL1PdH2JPufffPCbyhBuziiGs',
    };

    try {
      await restApiGet(`${api_ninjas_url}?word=${word}`, headers)
        .then((result) => {
          if (result && result.synonyms) {
            // Select 5 random synonyms
            let synonyms = result.synonyms;
            if (synonyms.length > 5) {
              synonyms = synonyms.slice(0, 5);
            }

            setTimeout(() => {
              setSynonyms(synonyms);
              setAILoading(false)
            }, 1800);

          }
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (error) {
      console.error('Error fetching synonyms:', error);
    } finally {
      setTimeout(() => {
        setAILoading(false)
      }, 1800);
    }
  };

  const handleQuery = (e) => {
    e.preventDefault()
    setPhotos([])
    fetchPhotos()
    setSynonyms([])
    fetchSynonyms()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setPhotos([])
    fetchPhotos(true)
    setSynonyms([])
    fetchSynonyms()
  }

  const handleBadgeClick = (e) => {
    console.log(e.target.innerText)
    setQuery(e.target.innerText)
    tmp_query = e.target.innerText
    handleQuery(e)
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

  useEffect(() => {
    fetchSynonyms();
  }, []);

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
            <CForm onSubmit={handleFormSubmit}>
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
                  <CButton className='main-search-btn' onClick={handleFormSubmit}> <CIcon icon={cilMagnifyingGlass} size='lg' />
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

          {/* Section 2 - Search Results */}
          <div style={{ opacity: loading ? 0.4 : 1 }}>
            {totalPages > 0 &&
              <CRow className="d-flex justify-content-center ">
                <CCol md={10} style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    className={aiLoading ? 'blink' : ''}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#673ab7',
                    }}
                  >
                    <CImage src={'/ai_star.png'} style={{ width: '30px', marginRight: '10px' }} />
                    AI assistant suggests:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '10px' }}>
                    {synonyms?.map((synonym, index) => (
                      <CBadge
                        key={index}
                        className='badge-btn'
                        shape='rounded-pill'
                        color='info'
                        style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          margin: '5px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        value={synonym}
                        onClick={handleBadgeClick}
                      >
                        {synonym}
                      </CBadge>
                    ))}
                  </div>
                </CCol>
                <CCol md={2}>
                  <p className='powered-p' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333', fontSize: 'initial' }}>
                    <span>Powered by</span>
                    <img src={unsplashLogo} height={60} alt="Unsplash Logo" className="ms-3 me-3" />
                  </p>
                </CCol>
                <hr style={{ height: '5px' }} />
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
