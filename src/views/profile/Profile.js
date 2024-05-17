import { useAuth0 } from "@auth0/auth0-react";
import { CImage } from "@coreui/react-pro";
import React from "react";
import { CLoading } from "src/common/CLoading";
import { FormatTimestamp, FormatTimestampDateTime } from "src/common/functions";
import LoginButton from "src/components/header/LoginButton";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div><CLoading /></div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <CImage rounded src={user.picture} alt={user.name} />
        <br />
        <br />
        <h1 className="profile-text"><strong>{user.name}</strong></h1>
        <h5 className="profile-text">{user.email}</h5>
        <hr style={{ height: '5px' }} />
        <h6 className="profile-text" style={{ position: 'absolute', bottom: '50px', right: '20px' }}>Member since <FormatTimestamp date={user.updated_at} /></h6>
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

export default Profile;
