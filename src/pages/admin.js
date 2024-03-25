import React from "react";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";
import ContactContainer from "../containers/contact";
import MapContainer from "../containers/global/map";
import Footer from "../layouts/footer";
import Header from "../layouts/header/index";
import Layout from "../layouts/index";

const Admin = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO title="SSN Digital Media | Admin" />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <ContactContainer />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Admin;
