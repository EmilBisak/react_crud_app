import React, { Component } from 'react';

import { LOGIN, REGISTER } from '../shared/constants';



const HOC = (WrappedComponent) => {
  return class HOC extends Component {
    state = {
      authToken: "",
      userID: "",
    }

    userLogin = (userData = {}) => {
      return fetch(LOGIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic" + this.state.authToken,
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ authToken: json.token })
          localStorage.setItem("authToken", json.token)
          console.log(this.state);
          return json
        })
        .catch(error => console.log(error))
    }
    userRegister = (userData = {}) => {
      return fetch(REGISTER, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic" + this.state.authToken,
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ authToken: json.token, userID: json.id })
          localStorage.setItem("authToken", json.token)
          console.log(this.state);
          return json
        })
        .catch(error => console.log(error))
    }

    getAuth = () => {
      return this.state.authToken? this.state.authToken : localStorage.getItem("authToken")
    }

    goToPage = (path) => this.props.history.push({ pathname: path });

    render() {
      return <WrappedComponent
        {...this.props}
        userLogin={this.userLogin}
        userRegister={this.userRegister}
        authToken={this.state.authToken}
        goToPage={this.goToPage}
        getAuth={this.getAuth}
         />;
    }
  }
}


export default HOC;
