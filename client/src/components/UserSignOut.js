import React from "react";
import { Redirect } from "react-router-dom";

const UserSignOut = () => {
  // requirements explicitly defines as this component to be designed as a stateless component
  // so the only thing this pure component needs to do is to redirect with a state to request signout for the root component
  // useContext hook can be used here if there was no state adjustment in case
  return (
    <Redirect
      to={{
        pathname: "/",
        state: { referrerSignOut: true },
      }}
    />
  );
};

export default UserSignOut;
