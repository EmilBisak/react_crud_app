# CRUD React SPA

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Getting Started Just clone the repo and start hacking:

-$ git clone https://github.com/EmilBisak/react_crud_app.git

-$ cd react_crud_app

-$ npm install # Install project dependencies listed in package.json

-$ npm start # Compiles the app and opens it in a browser with "live reload"


## Task Info:

Implement a simple crud app for users with auth support
Project should be done in some FE framework.

It should be done as a SPA, so some routing library should be involved, for example for
Vuejs should be Vue-router. It should contain at least 3 pages:
Login
--it should have a login with front end validation
-- when user logs in (credentials doesn't matter) login will return access token that needs
to be saved and sent as auth header with each request for user manipulation
Users list
-- it should have pagination
-- it should have create new user action
-- each user should have delete option
-- it should be able to sort list by id or first name
-- click on the user should open user edit modal that will show form for editing the user
with all gathered info (first_name, last_name, avatar)
Create user form
-- first name
-- last name
-- email (with validation)
-- phone - when phone number is inputed, input should be automatically masked to
format (123) 456-7890, it should only allow to input numbers no more than 10 digits. when
data is sent to the server to create a record, phone number should be sent in format
1234567890
-- date of birth (with calendar plugin)
API for users manipulation you should use fake api that can be found on this url
https://reqres.in/
You prioritize the order of the features to implement and the code structure.
Tips:
-- Use some of the project boilerplates that can be found on github as a starting point.
When you find some boilerplate, attach the link to it when sending the test. Also, after
boilerplate setup that should be the initial commit in the test.
-- We don't care about the design of the implementation. You can use plain Bootstrap or
some free theme like https://adminlte.io/
-- Use of external plugins and libraries like jQuery is allowed
