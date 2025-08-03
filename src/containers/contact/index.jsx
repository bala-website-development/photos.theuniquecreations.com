import ContactForm from "../../components/contact-form";
import ContactInfo from "../../components/contact-info";
import ContactData from "../../data/global/contact.json";

const ContactContainer = () => {
  return (
    <div className="contact-area">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 m-auto text-center" data-aos="fade-up">
            <h2 className="title">Contact us for bookings, questions, possible projects &amp; business partnerships</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-10 m-auto">
            <div className="contact-info-content d-none ">
              {ContactData &&
                ContactData.map((single, key) => {
                  return <ContactInfo data={single} key={key} />;
                })}
            </div>
            <div></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-10 m-auto">
            <div className="contact-form">
              <div className="text-center" data-aos="fade-up">
                <ContactForm />
              </div>
              <br />
              <br />
              <div className="text-center">Contact us at below social links</div>
              <div className="text-center" data-aos="fade-up">
                <h2 className="title">
                  {" "}
                  <big>
                    <a href="https://wa.me/15027802999" className="px-1 text-success" target="_blank" rel="noopener noreferrer">
                      <i className="icofont-whatsapp fa-lg"></i>
                    </a>
                  </big>{" "}
                  <big>
                    <a href="https://www.instagram.com/ssndigitalmedia" className="px-1 text-success" target="_blank" rel="noopener noreferrer">
                      <i className="icofont-instagram fa-lg"></i>
                    </a>
                  </big>{" "}
                  <big>
                    <a href="mailto:ssndigitalmediaservices@gmail.com" className="px-1 text-alert" target="_blank" rel="noopener noreferrer">
                      <i className="icofont-mail fa-lg"></i>
                    </a>
                  </big>
                  <br /> <br />
                  Contact :
                  <a href="mailto:ssndigitalmediaservices@gmail.com" className="px-1 text-alert" target="_blank" rel="noopener noreferrer">
                    ssndigitalmediaservices@gmail.com
                  </a>
                  <br /> <br />
                  <a href="https://g.page/r/CXPd4JFrWEg8EBM/review" className="p-2 border rounded bg-light">
                    Rate and Review us on Google
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
