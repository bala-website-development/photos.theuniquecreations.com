import { Link } from "react-router-dom";
import FooterLogo from "../../components/footer-logo";
import config from "../../config.json";

const Footer = () => {
  return (
    <footer className="footer-area reveal-footer border-top-style py-1">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="footer-content">
              <div className="widget-item">
                <div className="widget-footer-nav">
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
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="widget-item text-center">
                <div className="about-widget logotitle py-1">
                  {/* <FooterLogo image={`${process.env.PUBLIC_URL}/img/logo.png`} /> */}
                  <h1 className="text-nowrap">{config.logotitle}</h1>
                </div>
                <div className="widget-copyright">
                  <p>
                    © {new Date().getFullYear()} <span>Bala</span>. Developed by .
                    <a target="_blank" href="https://www.theuniquecreations.com" rel="noreferrer">
                      Unique Creations
                    </a>
                  </p>
                </div>
              </div>
              <div className="widget-item">
                <ul className="widget-social">
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
                    <a href="https://www.instagram.com/balakumar.velusamy" target="_blank" rel="noopener noreferrer">
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
