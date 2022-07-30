import React, {Component} from "react";
import axios from "axios";
import SubmitButton from "../components/SubmitButton";
import {setAuthToken} from "../helpers/setAuthToken";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.email = React.createRef();
        this.password = React.createRef();
        this.terms = React.createRef();

        this.state = {
            formErrors: [],
            termSubmitError: '',
        };
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const email = this.email.current;
        const password = this.password.current;
        const terms = this.terms.current;

        if (terms.checked === false) {
            this.setState({termSubmitError: 'To register you have to agree with terms'});

            return;
        }

        const data = {
            email: email.value,
            plainPassword: password.value,
        };

        axios
            .post("/api/register",
                data
            )
            .then(response => {
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
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        const {termSubmitError} = this.state;

        return (<div>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="email" name="email" ref={this.email}/>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" id="password" name="password" ref={this.password}/>
                    <br/>
                    <label htmlFor="checkbox">Agree with terms</label>
                    <input type="checkbox" ref={this.terms}/>
                    {termSubmitError && <p className="text-red-700">{termSubmitError}</p>}
                    <br/>
                    <SubmitButton name='Register'/>
                </form>
            </div>
        )
    };
}
