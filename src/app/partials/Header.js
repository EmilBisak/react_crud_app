import React, { Component } from 'react';
import { Link } from "react-router-dom";
import M from 'materialize-css';
import { createHashHistory } from 'history'

import HOC from '../HOC/HOC';

class Header extends Component {
  constructor() {
    super();
    this.hamburgerBtn = React.createRef()
  }

  componentDidMount() {
    M.Sidenav.init(this.hamburgerBtn.current);
  }

  logOut = event => {
    event.preventDefault();
    localStorage.removeItem("authToken");
    createHashHistory().push("/");
  }


  render() {
    return (
      <header>
        <nav className="indigo accent-2">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center" replace>CRUD Users App</Link>
            <Link to="/" data-target="mobile-demo" className="sidenav-trigger" replace>
              <i className="material-icons">menu</i>
            </Link>
            <ul className="left hide-on-med-and-down">
              <li>
                <Link to="" replace onClick={this.logOut}><i className="material-icons left" >power_settings_new</i>Log Out</Link>
              </li>
              <li>
                <Link to="/users" replace><i className="material-icons left">people</i>Users</Link>
              </li>
              <li>
                <Link to="/create_user" replace><i className="material-icons left">person_add</i>Create user</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo" ref={this.hamburgerBtn}>
          <li>
            <Link to="/users" replace><i className="material-icons right">people</i>Users</Link>
          </li>
          <li>
            <Link to="/create_user" replace><i className="material-icons right">person_add</i>Create user</Link>
          </li>
          <li>
            <Link to="" replace onClick={this.logOut}><i className="material-icons right">power_settings_new</i>Log Out</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default HOC(Header);
