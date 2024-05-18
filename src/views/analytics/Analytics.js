import { useAuth0 } from "@auth0/auth0-react";
import { CImage } from "@coreui/react-pro";
import React from "react";
import { CLoading } from "src/common/CLoading";
import { FormatTimestamp } from "src/common/functions";
import LoginButton from "src/components/header/LoginButton";

const Analytics = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div><CLoading /></div>;
  }

  if (isAuthenticated) {
    return (
      <div>

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
