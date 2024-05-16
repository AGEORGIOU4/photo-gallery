import { useAuth0 } from "@auth0/auth0-react";
import { CImage } from "@coreui/react-pro";
import React from "react";
import { CLoading } from "src/common/CLoading";
import { FormatTimestamp, FormatTimestampDateTime } from "src/common/functions";

const Analytics = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)
  if (isLoading) {
    return <div><CLoading /></div>;
  }

  return (
    isAuthenticated && (
      <div>

        <CImage rounded src={user.picture} alt={user.name} />

      </div>
    )
  );
};

export default Analytics;