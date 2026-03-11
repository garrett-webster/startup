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

export default function App() {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"));
    const [eventInfo, setEventInfo] = useState(() => {
        const stored = localStorage.getItem("eventInfo");
        return stored
            ? JSON.parse(stored)
            : {
                name: "Event Name",
                organizer: "Organizer Name",
                description: "Event Description",
                latitude: 0,
                longitude: 0
            };
    });

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", currentUser);
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem("eventInfo", JSON.stringify(eventInfo))
    }, [eventInfo])

    return (
            <div className="page">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand fs-3" to="/">Whenify </NavLink>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item dropdown">
                                    {currentUser && (
                                        <>
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
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
                                                    onClick={() => {
                                                        localStorage.removeItem("currentUser");
                                                        setCurrentUser(null);
                                                    }
                                                }
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
                        <Route path="/" element={currentUser ? <Whenify eventInfo={eventInfo} currentUser={currentUser}/> : <Navigate to="/login" replace />}/>
                        <Route path='/edit' element={currentUser ? <Edit eventInfo = {eventInfo} setEventInfo = {setEventInfo} setCurrentUser={setCurrentUser}/> : <Navigate to="/login" replace />} />
                        <Route path='/login' element={!currentUser ? <Login setCurrentUser = { setCurrentUser } /> : <Navigate to="/" replace />} />
                        <Route path='/register' element={!currentUser ? <Register setCurrentUser = { setCurrentUser } /> : <Navigate to="/" replace />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>

                <footer>
                    <p>By Garrett Webster</p>
                    <a href="https://github.com/garrett-webster">My GitHub page</a>
                </footer>
            </div>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}