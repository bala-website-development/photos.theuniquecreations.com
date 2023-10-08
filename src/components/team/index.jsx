import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Team = ({ data }) => {
  return (
    <div className={data.classOption}>
      <div className="thumb">
        <img src={data.image} alt="Alexis-Team" />
      </div>
      <div className="content">
        <div className="member-info">
          <h3 className="name">
            <Link dangerouslySetInnerHTML={{ __html: data.name }}></Link>
          </h3>
          <span className="designation">{data.designation}</span>
        </div>
        <div className="member-icons">
          {/* <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="social_twitter"></i>
                    </a> */}
          <a href="https://instagram.com/balakumar.velusamy" target="_blank" rel="noopener noreferrer">
            <i className="social_instagram"></i>
          </a>
          {/* <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="social_linkedin_square"></i>
                    </a> */}
        </div>
      </div>
    </div>
  );
};

Team.propTypes = {
  data: PropTypes.object,
};

export default Team;
