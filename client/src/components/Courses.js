import React from "react";
import { Link } from "react-router-dom";
import { withUserContext } from "../context/UserState";

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    const { state } = this.props.history.location;
    const { userContext } = this.props;

    if (state && state.referrerSignOut) {
      userContext.auth.signOut();
    }

    fetch("http://localhost:5000/api/courses")
      .then((response) => {
        return response.json();
      })
      .then((list) => {
        this.setState({
          courses: [...list],
        });
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push("/error");
      });
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="bounds">
        {courses.map((course) => (
          <div key={course.id} className="grid-33">
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="course--module course--link"
            >
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </div>
        ))}

        <div className="grid-33">
          <Link
            to="/courses/create"
            className="course--module course--add--module"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default withUserContext(Courses);
