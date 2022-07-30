import React from "react";
import axios from "axios";
import {setAuthToken} from "../helpers/setAuthToken"
import {Link} from "react-router-dom";

function Login() {
    const handleSubmit = (email, password) => {
        axios
            .post("/api/auth/token/login",
                {
                    email: email,
                    password: password
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
                <label htmlFor="email">Email</label><br/>
                <input type="email" id="email" name="email"/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" name="password"/><br></br>
                <input type="submit" value="Submit"/>
            </form>

            <div>
                <Link to='/register' className="px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200">Register</Link>
            </div>
        </div>
    );
}

export default Login
