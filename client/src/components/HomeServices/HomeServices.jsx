import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import "./HomeServices.css";
import useHomeServices from "../../hooks/useHomeServices";
import { getServiceIcon } from "../../utils/serviceIcons";

const HomeServices = () => {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { data, isLoading, isError } = useHomeServices();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = Array.isArray(data) ? data : [];

  return (
    <section
      ref={rootRef}
      id="services-preview"
      className={`home-services${visible ? " home-services--visible" : ""}`}
      aria-labelledby="home-services-heading"
    >
      <div className="home-services__inner paddings innerWidth">
        <header className="home-services__intro">
          <p className="home-services__eyebrow">Services</p>
          <h2 id="home-services-heading" className="home-services__heading">
            How we help teams ship
          </h2>
        </header>

        {isLoading ? (
          <div className="home-services__loading flexCenter">
            <PuffLoader color="#4066ff" size={56} aria-label="Loading services" />
          </div>
        ) : isError ? (
          <p className="home-services__notice secondaryText" role="alert">
            Services could not be loaded. Try again later.
          </p>
        ) : items.length === 0 ? (
          <p className="home-services__notice secondaryText">No services to show.</p>
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
                    <Link className="home-services__more" to="/services">
                      Discover more
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HomeServices;
