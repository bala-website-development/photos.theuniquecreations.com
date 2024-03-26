import { Link } from "react-router-dom";
import FooterLogo from "../../components/footer-logo";
import config from "../../config.json";

const Footer = () => {
  return (
    <footer className="footer-area reveal-footer  py-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="footer-content justify-content-between">
              <div className="widget-item text-center">
                <div className="about-widget logotitle py-1 pt-1">
                  {/* <FooterLogo image={`${process.env.PUBLIC_URL}/img/logo.png`} /> */}
                  <h1 className="text-nowrap px-3">{config.logotitle}</h1>
                </div>
                <div className="widget-copyright d-none">
                  <p>
                    © {new Date().getFullYear()} <span></span> |{" "}
                    <a target="_blank" href="#" rel="noreferrer">
                      SSN Digital Media LLC
                    </a>
                  </p>
                </div>
              </div>{" "}
              <div className="widget-item text-center">
                <div className="widget-footer-nav pt-3">
                  <nav>
                    <ul>
                      {/* <li>
                        <Link to={process.env.PUBLIC_URL + "/about"}>term &amp; condition</Link>
                      </li> */}
                      <li>
                        <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
                      </li>
                      <li>
                        <Link to={process.env.PUBLIC_URL + "/about"}>About</Link>
                      </li>
                      <li>
                        <Link to={process.env.PUBLIC_URL + "/video-gallery"}>Video Gallery</Link>
                      </li>
                      <li>
                        <Link to={process.env.PUBLIC_URL + "/contact"}>Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="widget-item d-none">
                <ul className="widget-social ">
                  <li className="social-text">
                    <span>follow us on social</span>
                  </li>
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
                    <a target="_blank" href="https://www.instagram.com/ssndigitalmedia" rel="noreferrer">
                      <i className="social_instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
