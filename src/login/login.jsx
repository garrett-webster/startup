import React from 'react';
import './login.css';
import {NavLink} from "react-router-dom";

export function Login() {
    return (
        <main>
            <div className="padding"></div>
            <div className="credentials-box">
                <h3>Login</h3>
                <form>
                    <label htmlFor="name" className="field">
                        Username
                        <input type="text" id="name" placeholder="Your username"/>
                    </label>
                    <label htmlFor="password" className="field">
                        Password
                        <input type="text" id="password" placeholder="Your password"/>
                    </label>
                    <input type="submit" value="Login"/>
                    <NavLink to="/register">Create account</NavLink>
                </form>

            </div>
            <div className="padding"></div>
        </main>
    );
}