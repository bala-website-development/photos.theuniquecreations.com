import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import HamburgerMenu from "../../components/hamburger-menu";
import HeaderSearch from "../../components/header-search";
import Logo from "../../components/logo/index";
import PopupSearch from "../../components/popup-search";
import config from "../../config.json";

const Header = ({ classOption }) => {
  const [ofcanvasShow, setOffcanvasShow] = useState(false);
  const onCanvasHandler = () => {
    setOffcanvasShow((prev) => !prev);
  };
  const [searchbarShow, setSearchbarShow] = useState(false);
  const onSearchHandler = () => {
    setSearchbarShow((prev) => !prev);
  };
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  useEffect(() => {
    const header = document.querySelector(".header-area");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = ({}) => {
    setScroll(window.scrollY);
  };
  return (
    <Fragment>
      <header className={`header-area header-default sticky-header ${classOption} ${scroll > headerTop ? "sticky" : ""}`}>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="header-action-area w-100">
                <button className="btn-menu" onClick={onCanvasHandler}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <span className="menu-text">
                  {" "}
                  <a href="/about">about</a>
                </span>
                <span className="menu-text">
                  {" "}
                  <a href="/contact"> contact</a>
                </span>
              </div>
            </div>

            <div className="col-auto">
              <div className="header-logo-area logotitle">
                <h1 className="text-nowrap">
                  <a href="/"> {config.logotitle}</a>
                </h1>
                {/* <Logo className="d-none" image={`${process.env.PUBLIC_URL}/img/logo.png`} /> */}
              </div>
            </div>

            <div className="col-auto">
              <div className="">
                {" "}
                <div className="widget-item">
                  <ul className="widget-social">
                    {/* <li className="social-text">
                      <span>follow us on social</span>
                    </li>  */}
                    {/* <li>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                      <i className="social_twitter"></i>
                    </a>
                  </li> */}
                    {/* <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                      <i className="social_facebook"></i>
                    </a>
                  </li> */}
                    <li>
                      <h5 className="p-1">
                        <a href="https://www.instagram.com/theuniquecreations" className="px-1" target="_blank" rel="noopener noreferrer">
                          <i className="social_instagram fa-lg"></i>
                        </a>
                        <a href="https://pin.it/5TSyoeI" className="px-1" target="_blank" rel="noopener noreferrer">
                          <i className="social_pinterest fa-lg"></i>
                        </a>
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <PopupSearch show={searchbarShow} onClose={onSearchHandler} />
      <HamburgerMenu show={ofcanvasShow} onClose={onCanvasHandler} />
    </Fragment>
  );
};

Header.propTypes = {
  classOption: PropTypes.string,
};

Header.defaultProps = {
  classOption: "header-area header-default sticky-header",
};

export default Header;
