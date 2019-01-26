import React, { Component } from "react";

import { USERS, USER } from "../shared/constants"
import Loading from "../partials/Loading";
import HOC from '../HOC/HOC';
import ModalEditUser from "../partials/ModalEditUser";


class Users extends Component {
  state = {
    users: "",
    user: "",
    loading: true,
    pageNumber: 1,
    isModalActive: false,
    filtered: [],
    sortToggle: false,
    first_name_edited: "",
    last_name_edited: "",
    edited_user_id: "",
    deleted_user_id: [],
    isUserDeleted: false
  };

  componentDidMount() {
    this.getUsers(this.state.pageNumber);
  }

  getUsers = pageNumber => {
    this.setState({ loading: true })
    fetch(USERS + pageNumber)
      .then(res => res.json())
      .then(json => this.setState({ users: json, filtered: json, loading: false }))
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  getUser = id => {
    this.setState({ loading: true })
    fetch(USER + "/" + id)
      .then(res => res.json())
      .then(json => this.setState({ user: json, loading: false, isModalActive: true }))
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  editUser = (userData, id) => {
    this.closeModal()
    this.setState({ loading: true })
    return fetch(USER + "/" + id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic" + this.props.authToken,
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          loading: false,
          firstName: "",
          lastName: "",
          first_name_edited: response.first_name,
          last_name_edited: response.last_name,
          edited_user_id: id
        })
        console.log(`== User with id-${id} is updated ==`, response);
        // alert(`== User with id-${id} is updated ==`, response);

      })
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  deleteUser = id => {
    this.setState({ loading: true })
    return fetch(USER + "/" + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic" + this.props.authToken,
      }
    })
      .then(response => {
        this.setState({
          loading: false,
          isUserDeleted: true,
          deleted_user_id: [...this.state.deleted_user_id, id]
        })
        console.log(`== User with id-${id} is deleted ==`, response)
      })
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  sortByAtoZAsc = () => {
    let arr = this.state.users.data.sort((a, b) => {
      let x = a.first_name.toLowerCase();
      let y = b.first_name.toLowerCase();

      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1
      }
      return 0;
    })
    this.setState({ filtered: arr })
  }

  sortById = () => {
    let arr = this.state.users.data.sort((a, b) => {
      let x = a.id;
      let y = b.id;

      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1
      }
      return 0;
    })
    this.setState({ filtered: arr })
  }

  toggleSort = () => {
    this.setState({ toggleSort: !this.state.toggleSort }, () => {
      this.state.toggleSort ? this.sortByAtoZAsc() : this.sortById();
    })
  }

  createPaginatinBtns = () => {
    const { pageNumber, users } = this.state;
    let paginationJSX = [];
    for (let i = 0; i < (users.total / users.per_page); i++) {
      let currentPage = i + 1;
      let liElement = <li
        key={"pageNum_" + currentPage}
        className={pageNumber === currentPage ? "active orange darken-3" : "waves-effect"}
        onClick={this.pagination}>
        <a>{currentPage}</a>
      </li>
      paginationJSX.push(liElement);
    }

    return paginationJSX
  }

  pagination = e => {
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

  openUser = e => {
    let id = 0;
    if (e.target.parentNode.tagName === "LI") {
      id = e.target.parentNode.children[4].innerHTML
    } else if (e.target.parentNode.tagName === "UL") {
      id = e.target.children[4].innerHTML
    }

    this.getUser(id)
  }

  deleteUserHandler = e => {
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
    console.log(this.state);
    const { pageNumber, users, user, loading, isModalActive, firstName, lastName, edited_user_id, first_name_edited, last_name_edited, deleted_user_id, isUserDeleted } = this.state;

    let usersJSX = !users
      ? <Loading />
      : users.data.map(user => {
        let isEdited = edited_user_id === user.id;
        return (
          <li className={isUserDeleted && deleted_user_id.includes(`${user.id}`) ? "hide" : "collection-item avatar transparent"} key={user.id} onClick={this.openUser} >
            <img src={user.avatar} alt="avatar" className="circle" />
            <span className="btn-floating waves-effect waves-light red lighten-1 right delete-button" onClick={this.deleteUserHandler}>
              <i className="material-icons">clear</i>
            </span>
            <p>{isEdited ? first_name_edited : user.first_name}</p>
            <p>{isEdited ? last_name_edited : user.last_name}</p>
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
          <div className="row">
            <div className="col s12 xl10 offset-xl1">
              <h2 className="center users">Users</h2>
              <div className="switch center">
                <h6>Sort Users</h6>
                <div id="sort-holder">
                  <label>By Id
                  <input type="checkbox"></input>
                    <span className="lever" onClick={this.toggleSort}></span>
                    By Name
                  </label>
                </div>
              </div>
              <ModalEditUser
                isModalActive={isModalActive}
                user={user}
                firstName={firstName}
                lastName={lastName}
                closeModal={this.closeModal}
                handleInput={this.handleInput}
                editUser={this.editUser} />
              <ul className="collection" id="collection">
                {usersJSX}
              </ul>
              <ul className="pagination center">
                <li className={pageNumber === 1 ? "disabled" : "waves-effect"} onClick={this.pagination}>
                  <span>
                    <i className="material-icons">chevron_left</i>
                  </span>
                </li>
                {this.createPaginatinBtns()}
                <li className={pageNumber === 4 ? "disabled" : "waves-effect"} onClick={this.pagination}>
                  <span>
                    <i className="material-icons">chevron_right</i>
                  </span>
                </li>
              </ul>
              {/* <Modal /> */}
            </div>
          </div>
        </div>
      </main >
  }
}

export default HOC(Users);
