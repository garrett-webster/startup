import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Edit } from './edit/edit';
import { Login } from './login/login';
import { Register } from './register/register';
import { Whenify } from './whenify/whenify';

export default function App() {
    return (
        <BrowserRouter>
            <div className="page">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand fs-3" to="/">Whenify </NavLink>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Carol Binsen
                                    </a>

                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                        <li><NavLink className="dropdown-item" to="edit">Edit</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="login">Log out</NavLink></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Whenify />} exact />
                    <Route path='/edit' element={<Edit />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <p>By Garrett Webster</p>
                    <a href="https://github.com/garrett-webster">My GitHub page</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}