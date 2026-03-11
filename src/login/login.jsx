import React, {useState} from 'react';
import './login.css';
import {NavLink, useNavigate} from "react-router-dom";

export function Login({ setCurrentUser }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('api/auth/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({name: name, password: password})
        });

        if (!response.ok) {
            const body = await response.json();
            alert(`Error: ${body.msg}`);
            return;
        }

        setCurrentUser(name);
        navigate("/");
    }

    return (
        <main>
            <div className="padding"></div>
            <div className="credentials-box">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <label className="field">
                        Username
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label className="field">
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Login"/>
                    <NavLink to="/register">Create account</NavLink>
                </form>

            </div>
            <div className="padding"></div>
        </main>
    );
}