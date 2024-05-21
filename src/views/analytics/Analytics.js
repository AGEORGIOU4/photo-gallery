import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CLoading } from "src/common/CLoading";
import { restApiGet } from "src/common/apis";
import LoginButton from "src/components/header/LoginButton";
import { server_url } from "src/common/urls";
import { CBadge } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cibGoogleAnalytics, cilLayers } from "@coreui/icons";

const Analytics = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [searches, setSearches] = useState([]);
  const [error, setError] = useState(null);

  const fetchSearches = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isAuthenticated) {
        const userId = user?.sub.split('|')[1];
        const tmp_searches = await restApiGet(`${server_url}/api/v1/search/read/${userId}`);
        if (tmp_searches) {
          console.log(tmp_searches.records[0])
          setSearches(tmp_searches.records[0].keywords);
        } else {
          setSearches([]);
        }
      }
    } catch (error) {
      console.error('Error fetching searches:', error);
      setError('Failed to fetch searches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearches();
  }, [isAuthenticated]);

  if (isLoading || loading) {
    return <div><CLoading /></div>;
  }

  if (isAuthenticated) {
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div>
        <p><strong>Past Searches <CIcon icon={cilLayers} /></strong></p>

        <div className='suggestions-badges' >
          {searches?.map((search, index) => (
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
              value={search?.word}
            // onClick={handleBadgeClick}
            >
              {search?.word}
            </CBadge>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div style={styles.centeredContainer}>
      <LoginButton />
    </div>
  );
};

const styles = {
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
};

export default Analytics;
