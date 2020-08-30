import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserState";

const Header = () => {
  const auth = useContext(UserContext);
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {auth.authenticatedUser ? (
            <React.Fragment>
                <span className="">Welcome {auth.authenticatedUser.firstName} {auth.authenticatedUser.lastName}!</span>
                <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
              <Link className="signin" to="/signin">
                Sign In
              </Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
