import React from "react";
import {NavLink} from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/Auth-context";
import "./NavLinks.css";

const NavLinks = () => {

    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li><NavLink to="/" exact>All users</NavLink></li>
            {auth.isLoggedin && <li><NavLink to="/userId/places" exact>My places</NavLink></li>}
            {auth.isLoggedin && <li><NavLink to="/places/new" exact>Add place</NavLink></li>}
            {!auth.isLoggedin && <li><NavLink to="/auth" exact>Authentication</NavLink></li>}
            {auth.isLoggedin && <button onClick={auth.logoff}>Logout</button>}
        </ul>
    );
}

export default NavLinks;