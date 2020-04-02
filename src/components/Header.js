import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <div className="container-header">
      <div className="container-nav">
        <div className="container-link">
          <nav className="navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
            <div className="collapse navbar-collapse">
              <div className="box1">
                <h5>Weather forcast</h5>
              </div>
              <div className="box2">
                <NavLink
                  exact
                  to="/"
                  className="navbar-brand"
                  activeClassName="main-nav-active"
                >
                  Home
                </NavLink>
              </div>
              <div className="box">
                <NavLink
                  exact
                  to="/favorite"
                  className="navbar-brand"
                  activeClassName="main-nav-active"
                >
                  Favorites
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="containerCard-deck">{children}</div>
    </div>
  );
};

export default Header;
