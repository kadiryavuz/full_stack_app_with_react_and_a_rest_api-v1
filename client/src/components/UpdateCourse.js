import React from "react";
import { Link } from "react-router-dom";
import Query from "../Query";

import ValidationErrors from "./ValidationErrors";

class UpdateCourse extends React.Component {
  state = {
    errors: [],
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    id: "",
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
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    this.query
      .updateCourse({ id, title, description, estimatedTime, materialsNeeded })
      .then((data) => {
        if (data.code === 400) {
          this.setState({ errors: data.errors });
        } else if(data.code === 403) {
          this.props.history.push("/forbidden");
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  componentDidMount() {
    //receiving course from the redirect state
    // const courseToUpdate = this.props.location.state
    //   ? this.props.location.state.subjectCourse
    //   : {};
    // if (courseToUpdate) {
    //   this.setState({
    //     title: courseToUpdate.title,
    //     description: courseToUpdate.description,
    //     estimatedTime: courseToUpdate.estimatedTime,
    //     materialsNeeded: courseToUpdate.materialsNeeded,
    //     id: courseToUpdate.id,
    //   });
    // }

    const {
      match: { params },
    } = this.props;

    fetch(`http://localhost:5000/api/courses/${params.id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        if (response.status === 500) {
          this.props.history.push("/notFound");
        }
      })
      .then((course) => {
        if (course) {
          this.setState({
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            id: course.id,
          });
        }
      })
      .catch((err) => {
        this.props.history.push("/error");
      });
  }

  render() {
    const {
      errors,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
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
                    onChange={this.onValueChanged}
                    value={title}
                  />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    onChange={this.onValueChanged}
                    value={description}
                  />
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
                        onChange={this.onValueChanged}
                        value={estimatedTime}
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
                        onChange={this.onValueChanged}
                        value={materialsNeeded}
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Update Course
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

export default UpdateCourse;
