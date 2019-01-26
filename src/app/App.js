import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.css'
import { Switch, Route } from "react-router-dom";

import './App.css';
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import Header from "./partials/Header";
import Footer from './partials/Footer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Users} />
          <Route path="/create_user" component={CreateUser} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
