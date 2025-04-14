import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Layout.css";

function Layout({ children }) {
    return (
        <div className="layout-container">
            <nav className="sidebar">
                <ul>
                    <li><Link to="/">Comments</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/albums">Albums</Link></li>
                    <li><Link to="/todos">Todos</Link></li>
                    <li><Link to="/users">Users</Link></li>
                </ul>
            </nav>
            <main className="content">{children}</main>
        </div>
    );
}

export default Layout;