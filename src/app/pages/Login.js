import React, { Component } from "react";

import HOC from '../HOC/HOC';

class Login extends Component {
    state = {
        username: "",
        password: "",
        emailErr: "",
        passErr: "",
        showEmailErr: false,
        showPassErr: false,
        showErr: false,
        authToken: ""
    }

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onChangeInputHandler = e => {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name === "email") {
            if (!this.validateEmail(e.target.value) && e.target.value !== "") {
                this.setState({ emailErr: "Invalid email input", showEmailErr: true })
            } else {
                this.setState({ showEmailErr: false });
            }
        }
        if (e.target.name === "password") {
            if (e.target.value.length < 6 && e.target.value !== "") {
                this.setState({ passErr: "Password has to be at least 6 characters long", showPassErr: true })
            } else {
                this.setState({ showPassErr: false })
            }
        }
    }

    onFormSubmitHandler = e => {
        const { email, password } = this.state;
        const { userLogin, goToPage } = this.props;
        e.preventDefault();
        userLogin({ "email": email, "password": password })
            .then(res => {
                if (res.token) {
                    goToPage("/logedIn")
                }
            })


    }

    render() {
        const { emailErr, passErr, showEmailErr, showPassErr } = this.state;

        return (
            <main id="main-login" className="indigo accent-2">

                <div className="container">
                    <div className="row">
                        <div className="col s0 m3"></div>
                        <div className="col s12 m6 login-holder">
                            <div className="z-depth-4 card" id="login-card">
                                <div className="row">
                                    <div className="input-field col s12 center login-title-holder">
                                        <img src="/logo.png" alt="" className="circle responsive-img valign profile-image-login" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col s12 center-align" > <h6>LOGIN</h6></div>
                                    <form className="col s12" >

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i className="material-icons prefix pt-5">email</i>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="validate"
                                                    name="email"
                                                    onChange={this.onChangeInputHandler}
                                                    required />
                                                <label htmlFor="email">Email</label>
                                                <p className={`error-msg ${showEmailErr ? "" : "hide"}`}>{emailErr}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12 ">
                                                <i className="material-icons prefix pt-5">lock_outline</i>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="validate"
                                                    name="password"
                                                    onChange={this.onChangeInputHandler}
                                                    required />
                                                <label htmlFor="password">Password</label>
                                                <p className={`error-msg ${showPassErr ? "" : "hide"}`}>{passErr}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <button
                                                    className="btn waves-effect waves-light col s12 orange darken-2"
                                                    onClick={this.onFormSubmitHandler}>Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default HOC(Login)