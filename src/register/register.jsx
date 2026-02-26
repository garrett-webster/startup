import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

export function Register({ setUser }) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !password || !passwordRepeat) return;
        if (password !== passwordRepeat) {
            alert("Passwords do not match");
            return;
        }

        const existing = JSON.parse(localStorage.getItem("users")) || [];

        const updated = [
            ...existing,
            { name, password }
        ];

        localStorage.setItem("users", JSON.stringify(updated));
        localStorage.setItem("name", name);
        setUser(name);

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