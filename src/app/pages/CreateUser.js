import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import HOC from "../HOC/HOC";
import { USER } from "../shared/constants";

class CreateUser extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        tel: "",
        date: new Date(),
        emailErr: "",
        phoneErr: "",
        showPhoneErr: false,
        showEmailErr: false,
        maskPhoneFormat: ""
    }

    createUser = (userData = {}) => {
        return fetch(USER, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic" + this.props.authToken,
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                console.log(response);
                alert("User is created")
            });
    }

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePhone = number => {
        let digits = ("" + number)
        const re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/
        return re.test(digits);
    }

    maskPhoneFormat = e => {
        let digits = ("" + e.target.value).split("")
        let formatArr = []
        for (let i = 0; i < digits.length; i++) {
            if (i === 0) {
                formatArr[0] = "("
            } else if (i === 3) {
                formatArr[4] = ")"
            }
            formatArr.push(digits[i])
        }

        this.setState({ maskPhoneFormat: formatArr.join("") });
    }

    onFormSubmitHandler = e => {
        e.preventDefault();
        const { first_name, last_name, email, tel, date, showPhoneErr, showEmailErr } = this.state;
        if (!showPhoneErr && !showEmailErr) {
            this.createUser({
                "name": first_name + " " + last_name,
                "job": "leader",
                "email": email,
                "tel": tel,
                "dateOfBirth": date
            })
            this.props.goToHomepage();
        }
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
        if (e.target.name === "tel") {
            if (!this.validatePhone(e.target.value) && e.target.value !== "") {
                this.setState({ phoneErr: "Invalid phone input, input must have 10 digits.", showPhoneErr: true })
            } else {
                this.setState({ showPhoneErr: false });
                e.target.value = this.state.maskPhoneFormat;
            }
        }
    }

    dateHandleChange = date => {
        this.setState({ date });
    }

    dateHandleSelect = date => {
        this.setState({ date });
    }


    render() {
        const { showEmailErr, emailErr, phoneErr, showPhoneErr } = this.state
        return (
            <main id="create-user-main">
                <div className="container">
                    <div className="row">
                        <form className="col s12" onSubmit={this.onFormSubmitHandler}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        className="validate"
                                        onChange={this.onChangeInputHandler}
                                        autoFocus
                                    />
                                    <label htmlFor="first_name">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        className="validate"
                                        onChange={this.onChangeInputHandler}
                                    />
                                    <label htmlFor="last_name">Last Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeInputHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                    <p className={`error-msg ${showEmailErr ? "" : "hide"}`}>{emailErr}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="tel"
                                        name="tel"
                                        type="tel"
                                        className="validate"
                                        onBlur={this.onChangeInputHandler}
                                        onChange={this.maskPhoneFormat}
                                    />
                                    <label htmlFor="tel">Phone Number</label>
                                    <p className={`error-msg ${showPhoneErr ? "" : "hide"}`}>{phoneErr}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <p className="datepicker-title">Date Of Birth</p>
                                    <DatePicker
                                        selected={this.state.date}
                                        onSelect={this.dateHandleSelect}
                                        onChange={this.dateHandleChange}
                                    />
                                </div>
                                <div className="col s6" id="new-user-button-holder">
                                    <button
                                        onClick={this.onCreateNewUser}
                                        className="btn waves-effect waves-light disable"
                                        type="submit"
                                        name="action">Submit
                                    <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}

export default HOC(CreateUser);
