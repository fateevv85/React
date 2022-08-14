import React, {Component} from "react";
import axios from "axios";
import {setAuthToken} from "../helpers/setAuthToken"
import SubmitButton from "../components/SubmitButton";
import LinkButton from "../components/LinkButton";

// todo доделать логин, убрать дублирование из Register, сделать сохранение refreshToken

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.email = React.createRef();
        this.password = React.createRef();

        this.state = {
            loginError: '',
        };
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const email = this.email.current;
        const password = this.password.current;

        axios
            .post("/api/auth/token/login",
                {
                    email: email.value,
                    password: password.value
                }
            )
            .then(response => {
                //get token from response
                const token = response.data.token;

                //set JWT token to local
                localStorage.setItem("token", token);

                //set token to axios common header
                setAuthToken(token);

                //redirect user to home page
                window.location.href = '/'

            })
            .catch(err => {
                console.log(err);

                this.setState({loginError: err.response.data});
            });
    };

    render() {
        const {loginError} = this.state;

        return (
            <div>
                <form
                    onSubmit={this.handleFormSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="email" name="email" ref={this.email}/>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" id="password" name="password" ref={this.password}/>
                    <br/>
                    <SubmitButton name='Login'/>
                </form>
                <div>
                    {loginError && <p className="text-red-700">{loginError}</p>}
                </div>
                <div>
                    <LinkButton to='/register' name='Create account'/>
                </div>
            </div>
        );
    }
};
