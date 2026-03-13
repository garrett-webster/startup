import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { connect } from "./websocket/Websocket";
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import { Edit } from './edit/edit';
import { Login } from './login/login';
import { Register } from './register/register';
import { Whenify } from './whenify/whenify';
import { AppContext } from "./context/AppContext";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);

    useEffect(() => {
        async function loadEventInfo() {
            try {
                const res = await fetch('/api/eventInfo', { credentials: 'include' });
                if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
                const data = await res.json();
                setEventInfo(data);
            } catch (err) {
                console.error(err);
            }
        }

        if (currentUser) {
            loadEventInfo();
        }
    }, [currentUser]);

    useEffect(() => {
        connect();

        fetch("/api/auth/me", { credentials: "include" })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.msg && data.msg !== currentUser) {
                    setCurrentUser(data.msg);
                }
            });
    }, []);

    return (
        <AppContext.Provider value={{
            currentUser,
            setCurrentUser,
            eventInfo,
            setEventInfo
        }}>
            <div className="page">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand fs-3" to="/">Whenify</NavLink>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item dropdown">
                                    {currentUser && (
                                        <>
                                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                               data-bs-toggle="dropdown">
                                                {currentUser}
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li>
                                                    <NavLink className="dropdown-item" to="edit">
                                                        Edit
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        className="dropdown-item"
                                                        to="login"
                                                        onClick={() => setCurrentUser(null)}
                                                    >
                                                        Log out
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <main className="content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                currentUser && eventInfo
                                    ? <Whenify />
                                    : <Navigate to="/login" replace />
                            }
                        />

                        <Route
                            path="/edit"
                            element={
                                currentUser
                                    ? <Edit />
                                    : <Navigate to="/login" replace />
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                !currentUser
                                    ? <Login />
                                    : <Navigate to="/" replace />
                            }
                        />

                        <Route
                            path="/register"
                            element={
                                !currentUser
                                    ? <Register />
                                    : <Navigate to="/" replace />
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <footer>
                    <p>By Garrett Webster</p>
                    <a href="https://github.com/garrett-webster">My GitHub page</a>
                </footer>
            </div>
        </AppContext.Provider>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}