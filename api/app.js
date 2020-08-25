"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./models");
const courses = require("./routes/courses");
const users = require("./routes/users");

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

//enabling cors requests
app.use(cors());

// Request to be handled as JSON by default
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// My api routes
app.use("/api/courses", courses);
app.use("/api/users", users);

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);


//autheticate db and start the server
let server;
db.sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
  server = app.listen(app.get("port"), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
  })
}).catch( err => {
  console.error("Unable to connect to the database:", error); 
})
