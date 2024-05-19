import { useAuth0 } from "@auth0/auth0-react";
import { CImage } from "@coreui/react-pro";
import React from "react";
import { CLoading } from "src/common/CLoading";
import { FormatTimestamp } from "src/common/functions";
import LoginButton from "src/components/header/LoginButton";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div><CLoading /></div>;
  }

  console.log(user)

  if (isAuthenticated) {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <CImage rounded src={user.picture} alt={user.name} />
          <br />
          <br />
          <h2 className="profile-text"><strong>{user.name}</strong></h2>
          <h6 className="profile-text">{user.email}</h6>
          <hr style={{ height: '5px' }} />
          <h6 className="profile-text" style={{ position: 'absolute', bottom: '50px', right: '20px' }}>Member since <FormatTimestamp date={user.updated_at} /></h6>
        </div>
        <div style={{ textAlign: 'center', color: 'red', }}>
          <p style={{ textDecoration: 'none', transition: 'text-decoration 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Permanently delete account</p>
        </div>


      </>
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

export default Profile;
