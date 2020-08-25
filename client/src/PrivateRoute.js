import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from './context/UserState';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <UserConsumer>
      {(userContext) => (
        <Route
          {...rest}
          render={(props) =>
            userContext.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </UserConsumer>
  );
};

export default PrivateRoute;
