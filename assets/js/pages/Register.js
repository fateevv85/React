import React from "react";
import axios from "axios";
import SubmitButton from "../components/SubmitButton";

function Register() {
    const handleSubmit = (email, password, terms) => {
        axios
            .post("/api/register",
                {
                    email: email,
                    password: password,
                    terms: terms
                }
            )
            .then(response => {
                window.location.href = '/login'

            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    const [email, password] = event.target.children;
                    handleSubmit(email, password);
                }}
            >
                <label htmlFor="email">Email</label>
                <br/>
                <input type="email" id="email" name="email"/>
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input type="password" id="password" name="password"/>
                <br/>
                <label htmlFor="checkbox">Agree with terms</label>
                <input type="checkbox"/>
                <br/>
                <SubmitButton name='Register'/>
            </form>
        </div>
    );
}

export default Register;
