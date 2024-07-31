import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FooterLogo from "../../components/footer-logo";
//ssn
const Intro = ({ data }) => {
  return (
    <div
      className="intro-section section overlay"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + data.backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row row-cols-lg-1 row-cols-1">
          <div className="col align-self-center">
            <div className="intro-content">
              <span className="sub-title">{data.subTitle}</span>
              <FooterLogo image={`${process.env.PUBLIC_URL}/img/logo.png`}></FooterLogo>
              <h2 className="title">{data.title}</h2>
              <div className="desc">
                <p>{data.desc}</p>
              </div>
              {/* //ssnssn */}

              <Link to={process.env.PUBLIC_URL + "/"} className="intro-btn">
                {data.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = {
  data: PropTypes.object,
};

export default Intro;
