import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.css'
import './App.css';
import Users from "./pages/Users";
import Header from "./partials/Header";

class App extends Component {
  render() {
    return (
      <Fragment>
      <Header />
      <Users />
      </Fragment>
    );
  }
}

export default App;
