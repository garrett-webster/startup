import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {registerUser, subscribeUsers} from "../../service";

export function Register({ setCurrentUser }) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [users, setUsers] = useState([])

    useEffect(() => {
        return subscribeUsers(setUsers);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !password || !passwordRepeat) return;
        const response = await fetch('api/auth/create', {
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