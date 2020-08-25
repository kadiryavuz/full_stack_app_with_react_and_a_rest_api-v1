import React from "react";
import { Link } from "react-router-dom";
import { withUserContext } from "../context/UserState";
import Query from "../Query";

import ValidationErrors from "./ValidationErrors";

class CreateCourse extends React.Component {
  state = {
    errors: [],
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
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
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    this.query
      .createCourse({ title, description, estimatedTime, materialsNeeded })
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  render() {
    const {
      errors,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    const {
      userContext: { authenticatedUser },
    } = this.props;
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>{<ValidationErrors errors={errors} />}</div>
          <form onSubmit={this.onSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    value={title}
                    onChange={this.onValueChanged}
                  />
                </div>
                <p className="capitalized">{`By ${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    value={description}
                    onChange={this.onValueChanged}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={estimatedTime}
                        onChange={this.onValueChanged}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        value={materialsNeeded}
                        onChange={this.onValueChanged}
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <Link className="button button-secondary" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withUserContext(CreateCourse);
