const express = require("express");
const bcryptjs = require("bcryptjs");
var CryptoJS = require("crypto-js");
const auth = require("basic-auth");
const db = require("../models");

const APP_SALT='waKFGRco9t4aPsuapFtV';
// autheticate user middleware to be use with protected routes where necessary
const authenticateUser = async (req, res, next) => {
  let retMsg = null;

  // Parse the user's authHeader from the Authorization header.
  const authHeader = auth(req);

  // If the user's authHeader are available...
  if (authHeader) {
    const user = await db.User.findOne({
      where: { emailAddress: authHeader.name },
    });

    if (user) {
      const decrypted = CryptoJS.AES.decrypt(authHeader.pass, APP_SALT).toString(CryptoJS.enc.Utf8);
      const authenticated = bcryptjs.compareSync(
        decrypted,
        user.password
      );

      if (authenticated) {
        console.log(
          `Successfully authenticated for username: ${user.emailAddress}`
        );
        req.currentUser = user;
      } else {
        retMsg = `Authentication failed for username: ${user.emailAddress}`;
      }
    } else {
      retMsg = `User ${authHeader.name} not found!`;
    }
  } else {
    retMsg = "Auth header not found";
  }

  if (retMsg) {
    // If user authentication failed...
    console.warn(retMsg);
    res.status(401).json({ message: "Access Denied" });
  } else {
    // Or if user authentication succeeded...
    next();
  }
};

module.exports = authenticateUser;
