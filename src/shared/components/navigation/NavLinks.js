import React from "react";
import {NavLink} from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li><NavLink to="/">All users</NavLink></li>
            <li><NavLink to="/places">My places</NavLink></li>
            <li><NavLink to="/places/new">Add places</NavLink></li>
            <li><NavLink to="/auth">Authentication</NavLink></li>
        </ul>
    );
}

export default NavLinks;