import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default class Query {
  request = (
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    authCredentials = null
  ) => {
    const base = "http://localhost:5000/api";
    const reqUrl = base + path;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const cookieObj = Cookies.get("authenticatedUser");

      if (cookieObj && !authCredentials) {
        const { token, emailAddress } = JSON.parse(cookieObj);
        authCredentials = {
          username: emailAddress,
          password: token,
        };
      }

      const encodedAuth = btoa(
        `${authCredentials.username}:${authCredentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedAuth}`;
    }
    return fetch(reqUrl, options);
  };

  getUser = async (username, password) => {
    //initial place to use password
    const APP_SALT = process.env.REACT_APP_SALT_KEY;
    if (!APP_SALT) {
      //this type of handling can be sepereate for dev and prd builts
      //i.e. if env is dev keep this structure
      //else don't
      throw new Error(
          "APP001:Missing app level configuration is detected. Please provide APP_SALT key and re-start application via *npm start",
      );
    }
    const token = CryptoJS.AES.encrypt(password, APP_SALT).toString();

    const response = await this.request(`/users`, "GET", null, true, {
      username,
      password: token,
    });

    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  createUser = async (user) => {
    const response = await this.request("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  };

  createCourse = async (course) => {
    const response = await this.request("/courses", "POST", course, true);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  };

  updateCourse = async (course) => {
    const response = await this.request(
      `/courses/${course.id}`,
      "PUT",
      course,
      true
    );
    if (response.status === 204) {
      return [];
    } else if (
      response.status === 400 ||
      response.status === 403 ||
      response.status === 500
    ) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      throw new Error();
    }
  };

  deleteCourse = async (id) => {
    const response = await this.request(`/courses/${id}`, "DELETE", {}, true);
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      throw new Error();
    }
  };
}
