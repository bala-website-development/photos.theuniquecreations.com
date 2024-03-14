import PropTypes from "prop-types";

const Qute = ({ data }) => {
  return (
    <>
      <div className="slider-content-area font-dancing" data-aos="fade-up">
        <h2 dangerouslySetInnerHTML={{ __html: data.qute }}></h2>
      </div>
      <div className="slider-content-area1" data-aos="fade-up">
        <p className="slider-content-area1" dangerouslySetInnerHTML={{ __html: data.aboutus }}></p>
      </div>
      <br />
    </>
  );
};

Qute.propTypes = {
  data: PropTypes.object,
};

export default Qute;
