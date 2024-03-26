import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import config from "../../config.json";

//const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ContactForm = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const onSubmit = (data, e) => {
    //await sleep(2000);
    //alert(JSON.stringify(data));
    const body = "<p>Hello " + data.name + "," + "</p>" + "<p>Thank you for reaching out to us, we will get back to you shorlty.</p>" + "<br/><p>Regards,</p> <p><a href='" + config.website + "'>" + config.websitetitle + "</a></p>" + "<table  style='border: 1px solid black'>" + " <tr  style='border: 1px solid black'><td> <i>Name:</i></td> <td> <i>" + data.name + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Email:</i></td><td> <i>" + data.email + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Message:</i></td><td> <i>" + data.message + "</i></td></tr>" + "</table>";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.fromemail,
        to: data.email + "," + config.fromemail,
        subject: config.subject + data.name,
        text: "",
        html: body,
      }),
    };
    console.log(requestOptions);
    try {
      fetch(config.email_service_url, requestOptions).then((response) => console.log(response.json()));
      //.then((data) => this.setState({ responsemessage: "Thanks for Contacting us." }));
      //this.setState({ responsemessage: "Thanks for Contacting us." });
      setSuccessMsg("Thanks for Contacting us. Kindly check span folder in your email.");
      e.target.reset();
    } catch (err) {
      console.log(err);
      alert("There is an error", err);
    }
  };

  return (
    <Fragment>
      {/* <form className="contact-form-wrapper" onSubmit={handleSubmit(onSubmit)}> */}
      <form className="contact-form-wrapper">
        <div className="row">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="form-group">
              <input className="form-control" type="text" name="name" placeholder="Your Name" ref={register({ required: "Name is required" })} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="600">
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email Address"
                ref={register({
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="900">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="subject"
                placeholder="Subject"
                ref={register({
                  required: "Subject is required",
                })}
              />
              {errors.subject && <p>{errors.subject.message}</p>}
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-up">
            <div className="form-group mb-0">
              <textarea
                name="message"
                rows="5"
                placeholder="Your message here..."
                ref={register({
                  required: "Message is required",
                })}
              ></textarea>
              {errors.message && <p>{errors.message.message}</p>}
            </div>
          </div>
          <div className="p-1 mt-1  ">{successMsg}</div>
          <div className="col-md-12 text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="form-group mb-0">
              <button className="btn-submit" type="submit">
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ContactForm;
