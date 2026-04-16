import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  return (
    <main className="services-page paddings innerWidth">
      <p className="services-page__eyebrow">Services</p>
      <h1 className="services-page__title primaryText">What we offer</h1>
      <p className="services-page__lede secondaryText">
        This page is a placeholder. Add your service tiers, engagement models, and
        process here when you are ready.
      </p>
      <Link className="button services-page__back" to="/">
        Back to home
      </Link>
    </main>
  );
};

export default Services;
