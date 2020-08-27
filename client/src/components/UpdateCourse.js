import React from "react";
import { Link } from "react-router-dom";
import Query from "../Query";
import { withUserContext } from "../context/UserState";
import ValidationErrors from "./ValidationErrors";

class UpdateCourse extends React.Component {
  state = {
    errors: [],
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    id: -1,
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

    const {
      match: { params },
    } = this.props;

    this.query
      .updateCourse({ id, title, description, estimatedTime, materialsNeeded })
      .then((data) => {
        if (data.code === 400) {
          this.setState({ errors: data.errors });
        } else if(data.code === 403) {
          this.props.history.push("/forbidden");
        } else if(data.code === 500) {
          this.props.history.push("/error");
        } else {
          this.props.history.push(`/courses/${params.id}`);
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  componentDidMount() {

    const {
      match: { params },
    } = this.props;

    const {
      userContext: { authenticatedUser },
    } = this.props;

    fetch(`http://localhost:5000/api/courses/${params.id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        if (response.status === 500) {
          this.props.history.push("/notfound");
        }
      })
      .then(course => {
        //after fetching, if course is owned by the auth user
        //then continue
        //else
        //redirect user to forbidden route
        if(course.userId === authenticatedUser.id) {
          return course;
        } else {
          this.props.history.push('/forbidden');
        }
      })
      .then((course) => {
        //if no course fetched, then 500 will be thrown by the server to be redirected to error page in the catch block
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
      materialsNeeded
    } = this.state;

    const {
      match: { params },
    } = this.props;

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
              <Link className="button button-secondary" to={`/courses/${params.id}`}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withUserContext(UpdateCourse);
