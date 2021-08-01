import React from "react";
import {NavLink} from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/Auth-context";
import "./NavLinks.css";

const NavLinks = () => {

    const auth = useContext(AuthContext);
    var userId = null;
    if(auth.loggedinUser)
        userId = auth.loggedinUser._id;
    return (
        <ul className="nav-links">
            <li><NavLink to="/" exact>All users</NavLink></li>
            {!!auth.loggedinUser && <li><NavLink to={`/places/user/${userId}`} exact>My places</NavLink></li>}
            {!!auth.loggedinUser && <li><NavLink to="/places/new" exact>Add place</NavLink></li>}
            {!auth.loggedinUser && <li><NavLink to="/auth" exact>Authentication</NavLink></li>}
            {!!auth.loggedinUser && <button onClick={auth.logoff}>Logout {auth.loggedinUser.name}</button>}
        </ul>
    );
}

export default NavLinks;