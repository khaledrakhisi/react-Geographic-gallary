import React from "react";
import {NavLink} from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
    return (
        <ul className="nav-links">
            <li><NavLink to="/" exact>All users</NavLink></li>
            <li><NavLink to="/userId/places" exact>My places</NavLink></li>
            <li><NavLink to="/places/new" exact>Add places</NavLink></li>
            <li><NavLink to="/auth" exact>Authentication</NavLink></li>
        </ul>
    );
}

export default NavLinks;