import React, { Component } from 'react';
import HOC from '../HOC/HOC';

class ModalEditUser extends Component {
    // <button onClick={() => props.userLogin(
    //     {
    //         "email": "emil@bisak",
    //         "password": "emilbisak"
    //     })}>Click to get authToken</button>

    onFormSubmitHandler = e => {
        e.preventDefault();
    }

    render() {
        const { isModalActive, user, firstName, lastName, closeModal, handleInput, editUser } = this.props

        return !isModalActive
            ?
            null
            :
            <div className="modal-holder">
                <div id="modal" className="modal open">
                    <div className="modal-content">
                        <div className="row">
                            <form className="col s12" onSubmit={this.onFormSubmitHandler}>
                                <div className="row">
                                    <img src={user.data.avatar} alt="avatar" className="circle" />
                                    <div className="input-field col s12">
                                        <input id="firstName" type="text" className="validate" defaultValue={user.data.first_name} autoFocus onChange={handleInput} />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="lastName" type="text" className="validate" defaultValue={user.data.last_name} autoFocus onChange={handleInput} />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light" type="button" name="action"
                                    onClick={() => editUser(
                                        {
                                            "first_name": firstName ? firstName : user.data.first_name,
                                            "last_name": lastName ? lastName : user.data.last_name
                                        },
                                        user.data.id)}>
                                    Edit User
            <i className="material-icons right">edit</i>
                                </button>
                                <button className="btn waves-effect waves-light red lighten-1 right" type="submit" name="action" onClick={closeModal}>Cancel
            <i className="material-icons left">cancel</i>
                                </button>
                                <p className="red-text"></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    }
}


export default HOC(ModalEditUser);