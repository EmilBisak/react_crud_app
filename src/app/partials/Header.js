import React, { Component } from "react";
import { Link } from "react-router-dom";

import M from 'materialize-css';


export default class Header extends Component {
  constructor() {
    super();
    this.hamburgerBtn = React.createRef()
  }

  componentDidMount() {
    M.Sidenav.init(this.hamburgerBtn.current);
  }
  render() {
    return (
      <header>
        <nav className="indigo accent-2">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo center" >
              CRUD Users App
            </a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="left hide-on-med-and-down">
              <li>
                <Link to="/" replace><i className="material-icons right">people</i>All users</Link>
              </li>
              <li>
                <Link to="/create_user" replace><i className="material-icons right">person_add</i>Create user</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo" ref={this.hamburgerBtn}>
          <li>
            <Link to="/" replace><i className="material-icons right">people</i>All users</Link>
          </li>
          <li>
            <Link to="/create_user" replace><i className="material-icons right">person_add</i>Create user</Link>
          </li>
        </ul>
      </header>
    );
  }
}
