import React from "react";
import { Link } from "react-router-dom";

import Query from "../Query";
import { withUserContext } from "../context/UserState";
import ValidationErrors from "./ValidationErrors";

class UserSignUp extends React.Component {
  state = {
    errors: [],
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  };

  query = new Query();

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
    // const { from } = this.props.location.state || { from: { pathname: "/" } };
    // const { emailAddress, password } = this.state;

    this.setState({
      errors: [],
    });
    console.error("onsubmit: ", e.target);
    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      emailAddress,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState((prevState) => ({
        errors: [
          ...prevState.errors,
          ["Password should be confirmed correctly"],
        ],
      }));
    } else {
      this.query
        .createUser({ firstName, lastName, password, emailAddress })
        .then((errors) => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            userContext.auth.signIn(emailAddress, password).then(() => {
              this.props.history.push("/");
              //   if (!user) {
              //     this.setState(() => {
              //       return { errors: ["Unsuccessful sign-in attempt!"] };
              //     });
              //   } else {
              //     this.props.history.push(from);
              //   }
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.props.history.push("/error");
        });
    }
    // const { userContext } = this.props;
    // const { from } = this.props.location.state || { from: { pathname: "/" } };
    // const { emailAddress, password } = this.state;

    // userContext.auth
    //   .signIn(emailAddress, password)
    //   .then((user) => {
    //     if (!user) {
    //       this.setState(() => {
    //         return { errors: ["Unsuccessful sign-in attempt!"] };
    //       });
    //     } else {
    //       this.props.history.push(from);
    //     }
    //   })
    //   .catch((error) => {
    //     this.props.history.push("/error");
    //   });
  };

  render() {
    const {
      errors,
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            {<ValidationErrors errors={errors} />}
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.onValueChanged}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.onValueChanged}
                />
              </div>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={this.onValueChanged}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  value={password}
                  onChange={this.onValueChanged}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.onValueChanged}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <Link className="button button-secondary" to="/">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}

export default withUserContext(UserSignUp);
