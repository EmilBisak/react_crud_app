import React, { Component } from "react";

import { USERS } from "../shared/constants"
import Loading from "../partials/Loading";
import Modal from "../partials/Modal";
import HOC from '../HOC/HOC';


class Users extends Component {
  state = {
    users: "",
    loading: true,
    pageNumber: 1
  };

  componentDidMount() {
    this.getUsers(this.state.pageNumber);
  }

  getUsers = (pageNumber) => {
    this.setState({ loading: true })
    fetch(USERS + pageNumber)
      .then(res => res.json())
      .then(json =>this.setState({ users: json, loading: false }))
      .catch(error => this.setState({ loading: true, errorMsg: error }))
  }

  createPaginatinBtns = () => {
    const { pageNumber, users } = this.state;
    let paginationJSX = [];
    for (let i = 0; i < (users.total / users.per_page); i++) {
      let currentPage = i + 1;
      let liElement = <li key={"pageNum_" + currentPage} className={pageNumber === currentPage ? "active" : "waves-effect"} onClick={this.pagination}>
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

  render() {
    const { pageNumber, users, loading } = this.state;



    let usersJSX = !users
      ? <Loading />
      : users.data.map(user => {
        return (
          <li className="collection-item avatar" key={user.id}>
            <img src={user.avatar} alt="avatar" className="circle" />
            <span className="title right">{user.id}</span>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
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
            <h2>Users</h2>
            <ul className="collection" id="collection">
              {usersJSX}
            </ul>
            <Modal />
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
          </div>
        </div>
      </main>
  }
}

export default HOC(Users);
