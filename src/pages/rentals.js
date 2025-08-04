import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";
import Footer from "../layouts/footer";
import Header from "../layouts/header/index";
import Layout from "../layouts/index";
import { Modal, Button, Form } from "react-bootstrap";
import ad300 from "../images/rentals/ad300.jpg";
import ad200 from "../images/rentals/ad200.jpg";
import lightstand from "../images/rentals/lightstand.jpg";
import oncameraflash from "../images/rentals/oncameraflash.jpg";
import combo from "../images/rentals/combo.jpg";

const rentalItems = [
  {
    title: "AD300 Pro Flash",
    price: "$20/day",
    thumbnail: ad300,
  },
  {
    title: "AD200 Pro Flash",
    price: "$15/day",
    thumbnail: ad200,
  },
  {
    title: "Canon On-Camera Flash",
    price: "$15/day",
    thumbnail: oncameraflash,
  },
  {
    title: "Light Stand",
    price: "$10/day",
    thumbnail: lightstand,
  },
  {
    title: "Combo 2X AD300 Pro Flash & Light Stand",
    price: "$35/day",
    thumbnail: combo,
  },
];

const RentalPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [sending, setSending] = useState(false);

  const handleRentClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setSuccessMsg("");
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(null);
    setSuccessMsg("");
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    setSending(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const messageInput = e.target.message.value;

    const message = `
      Rental Request for ${selectedItem.title} (${selectedItem.price}/day)
      Pickup Location: Nashville 37210

      Name: ${name}
      Email: ${email}
      Phone: ${phone}

      Message:
      ${messageInput}
    `;

    try {
      await axios.post(config.email_service_url, {
        from: config.fromemail,
        to: `${email},${config.fromemail}`,
        subject: `Rental Request - ${selectedItem.title}`,
        text: "",
        html: `<p>Hello ${name},</p><p>Thank you for your rental inquiry. We will get back to you shortly.</p><br/><p><strong>Rental Details:</strong></p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      });
      setSuccessMsg("Your rental request has been sent. Please check your email including the spam folder.");
      e.target.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send rental request. Please try again later.");
    }
    setSending(false);
  };

  return (
    <React.Fragment>
      <Layout>
        <Header />
        <SEO title="Rent Photography Gear - SSN Digital Media" />
        <div className="wrapper home-default-wrapper py-1">
          <div className="container">
            <h2 className="mb-4">Rental Products (Nashville)</h2>
            <div className="row">
              {rentalItems.map((item, idx) => (
                <div className="col-md-3 mb-4" key={idx}>
                  <div className="card h-100">
                    <img src={item.thumbnail} className="card-img-top" alt={item.title} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.price}</p>
                      <Button variant="warning" onClick={() => handleRentClick(item)} className="mt-auto">
                        Rent
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Rent {selectedItem?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSendMail}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" name="message" defaultValue={`I would like to rent the ${selectedItem?.title} at ${selectedItem?.price}. Please provide pickup details.`} rows={4} required />
              </Form.Group>
              <Button type="submit" variant="success" disabled={sending}>
                {sending ? "Sending..." : "Send Request"}
              </Button>
            </Form>
            {successMsg && <p className="mt-3 text-success">{successMsg}</p>}
            <hr />
            <p className="small">
              Payments accepted via Zelle at <strong className="text-dark">ssndigitalmediaservice@gmail.com</strong>
              <br />
              Pickup details will be shared after confirmation. <br />
              <strong className="text-dark">Pickup Location : Nashville Downtown</strong>
            </p>
          </Modal.Body>
        </Modal>

        <Footer />
      </Layout>
    </React.Fragment>
  );
};

export default RentalPage;
