import React, { Component } from "react";
import Query from "../Query";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const UserContext = React.createContext({});

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser"),
  };
  query = new Query();

  signIn = async (username, password) => {
    const user = await this.query.getUser(username, password);
    if (user) {

      const APP_SALT = process.env.REACT_APP_SALT_KEY;
      user.token = CryptoJS.AES.encrypt(password, APP_SALT).toString();

      this.setState({ authenticatedUser: user });
      const cookieOptions = {
        expires: 1, // 1 day
      };
      Cookies.set("authenticatedUser", JSON.stringify(user), cookieOptions);
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });

    Cookies.remove("authenticatedUser");
  };

  render() {
    const { authenticatedUser } = this.state;
    return (
      <UserContext.Provider
        value={{
          authenticatedUser,
          query: this.query,
          auth: { signIn: this.signIn, signOut: this.signOut },
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;

export const withUserContext = (Component) => (props) => (
  <UserContext.Consumer>
    {(userContext) => <Component userContext={userContext} {...props} />}
  </UserContext.Consumer>
);
