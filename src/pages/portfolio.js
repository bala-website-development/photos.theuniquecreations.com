import React from "react";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";
import QuteContainer from "../containers/global/global-qute/index.jsx";
import PortfolioContainer from "../containers/global/portfolio/index.jsx";
import Footer from "../layouts/footer";
import Header from "../layouts/header/index";
import Layout from "../layouts/index";
import IntroContainer from "../containers/home/intro/index.jsx";

const Portfolio = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO title="Bala's Unique Creations || Photography" />
        <div className="wrapper home-default-wrapper">
          <Header />
          <IntroContainer />
          <div className="main-content">
            <QuteContainer />
            <PortfolioContainer />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Portfolio;
