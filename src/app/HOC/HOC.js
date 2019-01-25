import React, { Component } from 'react';



const HOC = (WrappedComponent) => {
  return class HOC extends Component {
    state = {
      authToken: "",
    }

    userLogin = (userData = {}) => {
      return fetch("https://reqres.in/api/login", {
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
          console.log(this.state);
        })
    }

    render() {
      return <WrappedComponent
        {...this.props}
        userLogin={this.userLogin}
        authToken={this.state.authToken} />;
    }
  }
}


export default HOC;
