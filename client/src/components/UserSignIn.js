import React from "react";
import { Link } from "react-router-dom";

import { withUserContext } from "../context/UserState";
import ValidationErrors from "./ValidationErrors";

class UserSignIn extends React.Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  onValueChanged = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { userContext } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { emailAddress, password } = this.state;

    userContext.auth.signIn(emailAddress, password)
      .then((user) => {
        if (!user) {
          this.setState(() => {
            return { errors: [ 'Unsuccessful sign-in attempt!' ] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        this.props.history.push('/error');
      });
  };

  render() {
    const { username, password, errors } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            {<ValidationErrors errors={errors} />}
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  onChange={this.onValueChanged}
                  value={username}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  onChange={this.onValueChanged}
                  value={password}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign In
                </button>
                <Link className="button button-secondary" to="/">
                  Cancel
                </Link>
                
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}

export default withUserContext(UserSignIn);
