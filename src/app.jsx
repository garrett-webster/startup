import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { connect } from "./websocket/Websocket";
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Edit } from './edit/edit';
import { Login } from './login/login';
import { Register } from './register/register';
import { Whenify } from './whenify/whenify';
import { AppContext } from "./context/AppContext";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        connect();

        fetch("/api/auth/me", { credentials: "include" })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data?.msg) {
                    setCurrentUser(data.msg);
                }
            })
            .catch(err => console.error("Auth check failed:", err))
            .finally(() => setIsAuthLoaded(true));
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetch('/api/eventInfo', { credentials: 'include' })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) setEventInfo(data);
                })
                .catch(err => console.error("Failed to load event info:", err));
        }
    }, [currentUser]);

    function logout() {
        fetch('/api/auth/logout', {
            method: 'POST',
            credentials: "include"
        })
            .then(() => {
                // Brute force reset to clear all memory and avoid ghost states
                window.location.href = '/login';
            })
            .catch(err => console.error('Logout error:', err));
    }

    if (!isAuthLoaded) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <AppContext.Provider value={{ currentUser, setCurrentUser, eventInfo, setEventInfo }}>
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
                                               data-bs-toggle="dropdown" aria-expanded="false">
                                                {currentUser}
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                                <li><NavLink className="dropdown-item" to="/edit">Edit</NavLink></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <button className="dropdown-item" onClick={logout}>
                                                        Log out
                                                    </button>
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
                                currentUser
                                    ? (eventInfo ? <Whenify /> : <div className="text-center mt-5">Loading Event Data...</div>)
                                    : <Navigate to="/login" replace />
                            }
                        />

                        <Route
                            path="/edit"
                            element={currentUser ? <Edit /> : <Navigate to="/login" replace />}
                        />

                        <Route
                            path="/login"
                            element={!currentUser ? <Login /> : <Navigate to="/" replace />}
                        />

                        <Route
                            path="/register"
                            element={!currentUser ? <Register /> : <Navigate to="/" replace />}
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <footer>
                    <p>By Garrett Webster</p>
                    <a href="https://github.com/garrett-webster" target="_blank" rel="noreferrer">My GitHub page</a>
                </footer>
            </div>
        </AppContext.Provider>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center p-5">404: Return to sender. Address unknown.</main>;
}