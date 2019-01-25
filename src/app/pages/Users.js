import React, { Component } from "react";

import { USERS, USER } from "../shared/constants"
import Loading from "../partials/Loading";
import HOC from '../HOC/HOC';
import Modal from "../partials/Modal";


class Users extends Component {
  state = {
    users: "",
    user: "",
    loading: true,
    pageNumber: 1,
    isModalActive: false,
  };

  componentDidMount() {
    this.getUsers(this.state.pageNumber);
  }

  getUsers = (pageNumber) => {
    this.setState({ loading: true })
    fetch(USERS + pageNumber)
      .then(res => res.json())
      .then(json => this.setState({ users: json, loading: false }))
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  getUser = (id) => {
    this.setState({ loading: true })
    fetch(USER + id)
      .then(res => res.json())
      .then(json => this.setState({ user: json, loading: false, isModalActive: true }))
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  editUser = (userData, id) => {
    this.closeModal()
    this.setState({ loading: true })
    return fetch(USER + id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic" + this.props.authToken,
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ loading: false })
        console.log(`== User with id-${id} is updated ==`, response)
      })
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  deleteUser = (id) => {
    this.setState({ loading: true })
    return fetch(USER + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic" + this.props.authToken,
      }
    })
      .then(response => {
        this.setState({ loading: false })
        console.log(`== User with id-${id} is deleted ==`, response)
      })
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  createPaginatinBtns = () => {
    const { pageNumber, users } = this.state;
    let paginationJSX = [];
    for (let i = 0; i < (users.total / users.per_page); i++) {
      let currentPage = i + 1;
      let liElement = <li key={"pageNum_" + currentPage} className={pageNumber === currentPage ? "active orange darken-3" : "waves-effect"} onClick={this.pagination}>
        <a href="#!">{currentPage}</a>
      </li>
      paginationJSX.push(liElement);
    }

    return paginationJSX
  }

  pagination = (e) => {
    const { pageNumber, users } = this.state
    let pageNum = parseInt(e.target.innerHTML)
    if (!isNaN(pageNum)) {

      this.setState({ pageNumber: pageNum })
      this.getUsers(pageNum)

    } else if (e.target.innerHTML === "chevron_left" && pageNumber > 1) {
      pageNum = pageNumber;
      pageNum--;
      this.setState({ pageNumber: pageNum })
      this.getUsers(pageNum)
    } else if (e.target.innerHTML === "chevron_right" && pageNumber < (users.total / users.per_page)) {
      pageNum = pageNumber;
      pageNum++;
      this.setState({ pageNumber: pageNum })
      this.getUsers(pageNum)
    }
  }

  openUser = (e) => {
    let id = 0;
    if (e.target.parentNode.tagName === "LI") {
      id = e.target.parentNode.children[4].innerHTML
    } else if (e.target.parentNode.tagName === "UL") {
      id = e.target.children[4].innerHTML
    }

    this.getUser(id)
  }

  deleteUserHandler = (e) => {
    e.stopPropagation()
    this.deleteUser((e.target.parentNode.parentNode.children[4].innerHTML))
  }

  closeModal = () => {
    this.setState({ isModalActive: false });
  }

  handleInput = event => {
    const target = event.target;
    this.setState({
      [target.id]: target.value
    });
  };

  render() {
    const { pageNumber, users, user, loading, isModalActive, firstName, lastName } = this.state;

    let usersJSX = !users
      ? <Loading />
      : users.data.map(user => {
        return (
          <li className="collection-item avatar transparent" key={user.id} onClick={this.openUser} >
            <img src={user.avatar} alt="avatar" className="circle" />
            <a className="btn-floating waves-effect waves-light red lighten-2 right" onClick={this.deleteUserHandler}>
              <i className="material-icons">clear</i>
            </a>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <span className="title right">{user.id}</span>
          </li>
        );
      });

    return loading
      ?
      <Loading />
      :
      <main id="main">
        <div className="container">
          <div className="content-inside">
            <h2 className="center users">Users</h2>
            {isModalActive
              ?
              <div className="modal-holder">
                <div id="modal" className="modal open">
                  <div className="modal-content">
                    <div className="row">
                      <form className="col s12">
                        <div className="row">
                          <img src={user.data.avatar} alt="avatar" className="circle" />
                          <div className="input-field col s12">
                            <input id="firstName" type="text" className="validate" defaultValue={user.data.first_name} autoFocus onChange={this.handleInput} />
                            <label htmlFor="firstName">First Name</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <input id="lastName" type="text" className="validate" defaultValue={user.data.last_name} autoFocus onChange={this.handleInput} />
                            <label htmlFor="lastName">Last Name</label>
                          </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="button" name="action"
                          onClick={() => this.editUser(
                            {
                              "first_name": firstName ? firstName : user.data.first_name,
                              "last_name": lastName ? lastName : user.data.last_name
                            },
                            user.data.id)}>
                          Edit User
                    <i className="material-icons right">edit</i>
                        </button>
                        <button className="btn waves-effect waves-light red lighten-1 right" type="submit" name="action" onClick={this.closeModal}>Cancel
                    <i className="material-icons left">cancel</i>
                        </button>
                        <p className="red-text"></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              :
              null
            }
            <ul className="collection" id="collection">
              {usersJSX}
            </ul>
            <ul className="pagination center">
              <li className={pageNumber === 1 ? "disabled" : "waves-effect"} onClick={this.pagination}>
                <a href="#!">
                  <i className="material-icons">chevron_left</i>
                </a>
              </li>
              {this.createPaginatinBtns()}
              <li className={pageNumber === 4 ? "disabled" : "waves-effect"} onClick={this.pagination}>
                <a href="#!">
                  <i className="material-icons">chevron_right</i>
                </a>
              </li>
            </ul>
            <Modal />
          </div>
        </div>
      </main >
  }
}

export default HOC(Users);
