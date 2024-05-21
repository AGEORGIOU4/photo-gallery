import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CLoading } from "src/common/CLoading";
import { restApiGet } from "src/common/apis";
import LoginButton from "src/components/header/LoginButton";
import { server_url } from "src/common/urls";
import { CRow } from "@coreui/react-pro";
import CPhoto from "../dashboard/Search/components/CPhoto";
import { getColumnCount } from "../dashboard/helpers";
import CLightbox from "../dashboard/LightBox/CLightbox";
import { cilStar } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Favorites = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  const [showLightbox, setShowLightbox] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState({});

  const [columns, setColumns] = useState(getColumnCount(window.innerWidth));

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


  const handleClick = (e) => {
    setSelectedPhoto(e.target.dataset)
    setShowLightbox(!showLightbox)
  }

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isAuthenticated) {
        const userId = user?.sub.split('|')[1];
        const tmp_photos = await restApiGet(`${server_url}/api/v1/photo/read/${userId}`);
        if (tmp_photos && tmp_photos.records.length > 0) {
          setPhotos(tmp_photos.records);
        } else {
          setPhotos([]);
        }
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to fetch photos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [isAuthenticated, showLightbox]);

  if (isLoading) {
    return <div><CLoading /></div>;
  }

  if (isAuthenticated) {
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div >
        <p><strong>Favorites <CIcon icon={cilStar} /></strong></p>
        <CLightbox showRemove={true} setVisible={setShowLightbox} visible={showLightbox} data={selectedPhoto} />
        <CRow xs={{ cols: 1 }} md={{ cols: columns }} className="g-4" style={{ placeContent: 'center' }}>
          {photos?.map((photo, index) => (
            <CPhoto
              key={index}
              id={photo.info.id}
              src={photo.info.srcRegular}
              author={photo.info.user ? JSON.parse(photo.info.user).name : ""}
              title={photo.info.title || ""}
              description={photo.info.description || ""}
              alt_description={photo.info.alt_description || ""}
              regular={photo.info.srcRegular || ""}
              created_at={photo.info.createdAt || ""}
              user={photo.info.user ? JSON.parse(photo.info.user) : {}}
              handleClick={handleClick}
            />
          ))}
        </CRow>
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

export default Favorites;
