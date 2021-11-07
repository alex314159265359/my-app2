import React from "react";

export default function Header() {
  return (
    <header>
      <div className="wrap row">
        <div className="col-lg-1 header__col col-md-6 col-sm-6 col-6 no-padding">
          <h1 className="logo">
            <a href="/">
              <img src="./img/logo.svg" style={{ opacity: ".92" }} />
              <span>SOVA</span>
            </a>
          </h1>
        </div>
        <div className="text-right col-lg-11 header__col col-md-6 col-sm-6 col-6 no-padding">
          <input type="checkbox" name="toggle" id="menu" />
          <label htmlFor="menu" id="menu_clk" className="toggleMenu">
            <div className="hamburger hamburger--spin">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </div>
          </label>
          <div className="header_right">
            <div className="mobile_height_menu">
              <nav className="top_menu ">
                <ul>
                  <li>
                    <a href="/rules">Правила обмена</a>
                  </li>
                  <li>
                    <a href="/faq">Ответы на вопросы</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
