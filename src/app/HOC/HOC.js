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

    openModal = () => {
      this.setState({ isModalActive: true, openModal: "OPEN" });
      setTimeout(() => {
        
        console.log("ISACTIVE", this.state.isModalActive);
      }, 2);
      
    }
  
    closeModal = () => {
      this.setState({ isModalActive: false });
    }

    render() {
      return <WrappedComponent 
      userLogin={this.userLogin} 
      closeModal={this.closeModal} 
      openModal={this.openModal} 
      openModalF={this.state.openModalF} 
      authToken={this.state.authToken} 
      isModalActive={this.state.isModalActive}/>;
    }
  }
}


export default HOC;
