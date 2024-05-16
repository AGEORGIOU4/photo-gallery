import { useAuth0 } from "@auth0/auth0-react";
import { CImage } from "@coreui/react-pro";
import React from "react";
import { CLoading } from "src/common/CLoading";
import { FormatTimestamp, FormatTimestampDateTime } from "src/common/functions";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)
  if (isLoading) {
    return <div><CLoading /></div>;
  }

  return (
    isAuthenticated && (
      <div>

        <CImage rounded src={user.picture} alt={user.name} />
        <br />
        <br />
        <h1 className="profile-text"><strong>{user.name}</strong></h1>
        <h5 className="profile-text">{user.email}</h5>
        <hr style={{ height: '5px' }} />


        <h6 className="profile-text" style={{ position: 'absolute', bottom: '50px', right: '20px' }}>Member since <FormatTimestamp date={user.updated_at} /></h6>
      </div>
    )
  );
};

export default Profile;