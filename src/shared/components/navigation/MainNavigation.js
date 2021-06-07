import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = () => {
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(true);

  const collapseSideDrawer = () => {
    setIsDrawerCollapsed(true);
  };
  const unCollapseSideDrawer = () => {
    setIsDrawerCollapsed(false);
  };

  return (
    <React.Fragment>
      {!isDrawerCollapsed && <Backdrop onClick={collapseSideDrawer} />}

      <SideDrawer show={!isDrawerCollapsed} onClick={collapseSideDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={unCollapseSideDrawer}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Ihre Orte</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
