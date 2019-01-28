import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.css'
import { Switch, Route, Redirect } from "react-router-dom";

import './App.css';
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Header from "./partials/Header";
import Footer from './partials/Footer';

class App extends Component {
  isLogedIn = () => {
    let isLogedIn = localStorage.getItem("authToken") && localStorage.getItem("authToken") !== "undefined";
    return isLogedIn;
  }
  render() {
    return this.isLogedIn()
      ?
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route path="/create_user" component={CreateUser} />
          <Redirect path='/' to='/users' />
        </Switch>
        <Footer />
      </Fragment>
      :
      <Switch>
        <Route exact path='/' component={Login} />
      </Switch>
  }
}

export default App;
