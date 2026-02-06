import React from 'react';
import {NavLink} from "react-router-dom";

export function Register() {
    return (
        <main>
            <div className="padding"></div>
            <div className="credentials-box">
                <h3>Register</h3>
                <form>
                    <label htmlFor="name" className="field">
                        Username
                        <input type="text" id="name" placeholder="Your username"/>
                    </label>
                    <label htmlFor="password" className="field">
                        Password
                        <input type="text" id="password" placeholder="Your password"/>
                    </label>
                    <label htmlFor="passwordRepeat" className="field">
                        Enter password again
                        <input type="text" id="passwordRepeat" placeholder="Your password"/>
                    </label>
                    <input type="submit" value="Register"/>
                    <NavLink to="/login">Already have account?</NavLink>
                </form>
            </div>
            <div className="padding"></div>
        </main>
    );
}