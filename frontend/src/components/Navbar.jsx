/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate} from "react-router-dom";
import logo from "../logo_katar.png";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
import '../style.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const hslValue = 'hsl(200, 90%, 25%)';

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
        <nav style={{ background: hslValue }} className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <img className="logo"
              src={logo}
              alt='logo'
              />

            <a style={{ color: "white" }} href='!#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

        
          <div id="navbarBasicExample" className="navbar-menu">
            
        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button onClick={logout} className="button is-light">
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
    </div>
  );
};

export default Navbar;