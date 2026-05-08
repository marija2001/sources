import React from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import "../../styles/pageHero.css";
import "../../components/HomeServices/HomeServices.css";
import "./Services.css";
import useHomeServices from "../../hooks/useHomeServices";
import { getServiceIcon } from "../../utils/serviceIcons";
import {
  softwareCapabilities,
  hardwareCapabilities,
  languagesAndTools,
} from "./servicesCapabilities";

const Services = () => {
  const { data, isLoading, isError } = useHomeServices();
  const items = Array.isArray(data) ? data : [];

  return (
    <main className="services-page">
      <section className="page-hero">
        <div className="page-hero__inner paddings innerWidth">
          <p className="page-hero__eyebrow">Services</p>
          <h1 className="page-hero__title">What we offer</h1>
          <p className="page-hero__lede">
            Firmware, hardware, and integration for teams shipping embedded
            products—from architecture and bring-up through validation and
            manufacturing support.
          </p>
        </div>
      </section>

      <section
        className="services-page__featured paddings innerWidth"
        aria-labelledby="services-featured-heading"
      >
        <header className="services-page__section-head">
          <p className="services-page__eyebrow">Highlights</p>
          <h2 id="services-featured-heading" className="services-page__h2">
            Core offerings
          </h2>
        </header>

        {isLoading ? (
          <div className="services-page__loading flexCenter">
            <PuffLoader color="#4066ff" size={56} aria-label="Loading services" />
          </div>
        ) : isError ? (
          <p className="services-page__notice secondaryText" role="alert">
            Services could not be loaded. Try again later.
          </p>
        ) : items.length === 0 ? (
          <p className="services-page__notice secondaryText">No services to show.</p>
        ) : (
          <ul className="home-services__grid" role="list">
            {items.map((item, i) => {
              const Icon = getServiceIcon(item.iconKey);
              const key = item.id ?? item._id ?? `svc-${i}`;
              return (
                <li
                  key={key}
                  className="home-services__card"
                  style={{ "--home-services-i": i }}
                >
                  <span className="home-services__sticker" aria-hidden />
                  <div className="home-services__card-body">
                    <div className="home-services__icon-wrap" aria-hidden>
                      <Icon className="home-services__icon" />
                    </div>
                    <h3 className="home-services__title">{item.title}</h3>
                    <p className="home-services__blurb">{item.blurb}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section
        className="services-page__capabilities paddings innerWidth"
        aria-label="Detailed capabilities"
      >
        <h2 className="services-page__cap-title">Software development</h2>
        <ul className="services-page__list">
          {softwareCapabilities.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h2 className="services-page__cap-title">Hardware development</h2>
        <ul className="services-page__list">
          {hardwareCapabilities.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h2 className="services-page__cap-title">Languages &amp; tools</h2>
        <ul className="services-page__list">
          {languagesAndTools.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <div className="services-page__back-wrap paddings innerWidth">
        <Link className="services-page__back" to="/">
          ← Back to home
        </Link>
      </div>
    </main>
  );
};

export default Services;
