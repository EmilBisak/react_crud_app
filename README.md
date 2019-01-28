# CRUD React SPA

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Getting Started Just clone the repo and start hacking:

-$ git clone https://github.com/EmilBisak/react_crud_app.git

-$ cd react_crud_app

-$ npm install # Install project dependencies listed in package.json

-$ npm start # Compiles the app and opens it in a browser with "live reload"


## App Info:


CRUD React single-page application contain 3 pages:

1. Login
* login with front end validation
* when user logs in, login return access token that is saved and sent as auth header with each request for user manipulation

2. Users list
* pagination
* create new user action
* each user have delete option
* sort list by id or first name
* click on the user open user edit modal that show form for editing the user
with all gathered info (first_name, last_name, avatar)

3. Create user form
* first name
* last name
* email (with validation)
* phone - when phone number is inputed, input automatically masked to
format (123) 456-7890, it only allow to input numbers no more than 10 digits. when
data is sent to the server to create a record, phone number sent in format
1234567890
* date of birth (with calendar plugin)
API for users manipulation you should use fake api that can be found on this url
https://reqres.in/

