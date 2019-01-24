import React, { Component} from "react";

class Users extends Component {
  state = {
    users: ""
  };

  componentDidMount() {
    fetch("https://reqres.in/api/users?page=1")
      .then(res => res.json())
      .then(json => {
        console.log(json.data);

        this.setState({ users: json });
      });
  }

  render() {
    let usersJSX = !this.state.users ? 
    null :
    this.state.users.data.map(user => {
        return (
          <li className="collection-item avatar" key={user.id}>
            <img src={user.avatar} alt="avatar" className="circle" />
            <span className="title right">{user.id}</span>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
          </li>
        );
      });
    
    return (
        <div className='container'>
        <h2>Users</h2>
        <ul className="collection">{usersJSX}</ul>
      </div>
    );
  }
}

export default Users;
