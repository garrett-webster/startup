import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function Register() {
    const { setCurrentUser } = useApp();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !password || !passwordRepeat) {
            alert("All fields are required");
            return;
        }

        if (password !== passwordRepeat) {
            alert("Passwords do not match");
            return;
        }

        const response = await fetch('/api/auth/create', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, password })
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({ msg: 'Unknown error' }));
            alert(`Error: ${body.msg}`);
            return;
        }

        // On successful registration, set current user
        setCurrentUser(name);
        navigate("/");
    };

    return (
        <main>
            <div className="padding"></div>
            <div className="credentials-box">
                <h3>Register</h3>
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

                    <label className="field">
                        Enter password again
                        <input
                            type="password"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                    </label>

                    <input type="submit" value="Register" />
                    <NavLink to="/login">Already have account?</NavLink>
                </form>
            </div>
            <div className="padding"></div>
        </main>
    );
}