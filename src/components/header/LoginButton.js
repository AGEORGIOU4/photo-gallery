import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CButton } from "@coreui/react-pro";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <CButton onClick={() => loginWithRedirect()}>Log In</CButton>;
};

export default LoginButton;