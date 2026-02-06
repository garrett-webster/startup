import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter} from "react-router-dom";

export default function App() {
    return <BrowserRouter>
        <div className="page">
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand fs-3" href="whenify.html">Whenify </a>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    Carol Binsen
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <li><a className="dropdown-item" href="edit.html">Edit</a></li>
                                    <li><a className="dropdown-item" href="login.html">Log out</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="body bg-dark text-light">App will display here</div>

            <footer>
                <p>By Garrett Webster</p>
                <a href="https://github.com/garrett-webster">My GitHub page</a>
            </footer>
        </div>
    </BrowserRouter>;
}