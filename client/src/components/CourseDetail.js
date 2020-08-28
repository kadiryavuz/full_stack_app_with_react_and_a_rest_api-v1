import React from "react";
import { Link } from "react-router-dom";

import { withUserContext } from "../context/UserState";
import Query from "../Query";
import Markdown from "./Markdown";

class CourseDetail extends React.Component {
  state = {
    courseDetail: {},
    loading: true,
  };

  query = new Query();

  componentDidMount() {
    const {
      match: { params },
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
      .then((course) => {
          if(course) {
            this.setState({
                courseDetail: { ...course },
                loading: false,
              });
          }
        
      })
      .catch((err) => {
        this.props.history.push("/error");
      });
  }

  onDeleteCourse = (e) => {
    e.preventDefault();
    this.query
      .deleteCourse(this.props.match.params.id)
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
    const { courseDetail, loading } = this.state;
    const {
      userContext: { authenticatedUser },
    } = this.props;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authenticatedUser &&
              authenticatedUser.id === courseDetail.userId ? (
                <span>
                  {/* course update handles fetching regarding course statefully
                  just keeping as a sample to describe how we can pass related course to update component
                  if we have stateless scenario */}
                  <Link
                    className="button"
                    to={{
                      pathname: `/courses/${courseDetail.id}/update`,
                      state: { subjectCourse: { ...courseDetail } },
                    }}
                  >
                    Update Course
                  </Link>

                  <Link className="button" to="/" onClick={this.onDeleteCourse}>
                    Delete Course
                  </Link>
                </span>
              ) : null}

              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        {loading ? (
          <div>Loading</div>
        ) : (
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{courseDetail.title}</h3>
                <p className="capitalized">{`By ${courseDetail.User.firstName} ${courseDetail.User.lastName}`}</p>
              </div>
              <div className="course--description">
                {/* {courseDetail.description} */}
                <Markdown input={courseDetail.description} />
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{courseDetail.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <Markdown input={courseDetail.materialsNeeded} />
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withUserContext(CourseDetail);
