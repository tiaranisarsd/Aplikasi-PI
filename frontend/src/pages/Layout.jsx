import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <React.Fragment>
      <Navbar toggleMenu={toggleMenu} />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className={`column is-2 ${isMenuActive ? 'is-active' : ''}`}>
          <Header isMenuActive={isMenuActive} />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
