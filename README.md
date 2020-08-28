# full_stack_app_with_react_and_a_rest_api-v1

## SETUP
NOTE: While setting up the project on your local, please follow below setup steps in order.
# API Setup
cd into /api folder from the root directorey of the project
run *npm install* to install the dependencies
run *npm start* to start api => it will run on http://localhost:5000/

# Secret(s) setup
This project includes env variables for demonstration purposes
The case subject to demonstration is explained below. In order to comply with it
- create *.env* file within the root directory of the */client* folder
- put following variable into the .env file
  - REACT_APP_SALT_KEY=waKFGRco9t4aPsuapFtV

# Client Setup
cd into /client folder from the root directory of the project
run *npm install* to install the dependencies
run *npm start* to start local dev => it will run on http://localhost:3000/

# NOTE: Markups, mockups and style files are saved in the */design* folder

## EXTRA CREDIT
1. Error & NotFound & Forbidden cases are handled by the following stateless components to improve UX
NotFound: */notfound* => Route and 400 cases - Display a message letting the user know that the requested page can't be found.
Forbidden: */forbidden* => Route and 403 cases - Displays a message letting the user know that they can't access the requested page.
UnhandledError: */error* => Route and 500 cases - Display a message letting the user know that an unexpected error has occurred.

2. User authentication is persisted with HTTP Cookie with 1 day duration
3. If user tries to directly access to an authorized page, app will get the user redirected to regarding url after a successfull signin process
4. App uses Basic Auth, so user passwords are exposed within request headers - *after base64 decoding*. In order to prevent this, it's demonstrated to encrypt user password with a salt key *which is explained above in the setup section* in aiming to prevent flying passwords while communicating the server. This is simple demonstration case, even the same salt_key is handled explicitly in the api side of the project. 
