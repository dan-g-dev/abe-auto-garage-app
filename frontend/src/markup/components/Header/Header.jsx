import React from "react";
//Import the link component from react-router-dom
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
//Import the login service to access the logout function
import loginServices from "../../../services/login.services";
//Import the custom context hook
import { useAuth } from "../../../contexts/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

function Header() {
  //Use the custom hook to access the data in the context
  const { isLogged, setIsLogged, employee } = useAuth();
  // console.log(useAuth())

  //Close the mobile nav dropdown after a link is tapped (Bootstrap doesn't
  //do this automatically for links inside a collapsible navbar-collapse)
  const closeMobileNav = () => {
    const navEl = document.getElementById("navbarNav");
    if (navEl && navEl.classList.contains("show")) {
      navEl.classList.remove("show");
    }
  };

  //log out event handler function
  const logOut = () => {
    // Call the logout function from the login service
    loginServices.logOut();
    // Set the isLogged state to false
    setIsLogged(false);
  };
  console.log(employee);
  return (
    <div>
      <header className="main-header header-style-one">
        {/* <!-- Header Top --> */}
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Enjoy the Beso while we fix your car</div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              <div className="right-column">
                {isLogged ? (
                  <div style={{ marginRight: "20px" }} className="phone-number">
                    <BsPersonCircle size={40} />
                    <strong style={{ marginLeft: "-1px" }}>
                      {" "}
                      {employee?.employee_first_name}{" "}
                    </strong>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Header Upper --> */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              {/* <!--Logo--> */}
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="right-column">
                {/* <!--Nav Box--> */}
                <div className="nav-outer">
                  {/* <!--Mobile Navigation Toggler--> */}
                  <div className="mobile-nav-toggler">
                    <img src="assets/images/icons/icon-bar.png" alt="" />
                  </div>

                  {/* <!-- Main Menu --> */}
                  <nav className="main-menu navbar navbar-expand-lg navbar-light">
  <div className="container">
    {/* Navbar Toggler for Mobile */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navigation Links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navigation navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={closeMobileNav}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/my-order" onClick={closeMobileNav}>Track Your Order</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about" onClick={closeMobileNav}>About Us</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/services" onClick={closeMobileNav}>Services</Link>
        </li>
        {isLogged && (
          <li className="nav-item">
            <Link className="nav-link" to="/admin" onClick={closeMobileNav}>Admin</Link>
          </li>
        )}
        <li className="nav-item">
          <Link className="nav-link" to="/contact" onClick={closeMobileNav}>Contact Us</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


                </div>
                <div className="search-btn"></div>
                {isLogged ? (
                  <div className="link-btn">
                    <Link
                      to="/"
                      className="theme-btn btn-style-one"
                      onClick={logOut}
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!--End Header Upper--> */}

        {/* <!-- Sticky Header  --> */}
        <div className="sticky-header">
          {/* <!-- Header Upper --> */}
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                {/* <!--Logo--> */}
                <div className="logo-box">
                  <div className="logo">
                    <Link to="/">
                      <img src="assets/images/custom/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="right-column">
                  {/* <!--Nav Box--> */}
                  <div className="nav-outer">
                    {/* <!--Mobile Navigation Toggler--> */}
                    <div className="mobile-nav-toggler">
                      <img src="assets/images/icons/icon-bar.png" alt="" />
                    </div>

                    {/* <!-- Main Menu --> */}
                    <nav className="main-menu navbar-expand-md navbar-light"></nav>
                  </div>
                  <div className="search-btn"></div>
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--End Header Upper--> */}
        </div>
        {/* <!-- End Sticky Menu --> */}

        {/* <!-- Mobile Menu  --> */}
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-remove"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="index.html">
                <img src="assets/images/logo-two.png" alt="" title="" />
              </Link>
            </div>
            <div className="menu-outer">
              {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
            </div>
          </nav>
        </div>
        {/* <!-- End Mobile Menu --> */}

        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>
    </div>
  );
}

export default Header;