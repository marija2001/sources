import React, { useMemo, useState } from "react";
import "./Projects.css";
import useProjects from "../../hooks/useProjects";
import { PuffLoader } from "react-spinners";
import { HiOutlineSearch, HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { truncate } from "lodash";

const STRIP_TONE_COUNT = 3;

const projectImageSrc = (card) => {
  const img = card?.image;
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return img.startsWith("/") ? img : `/${img}`;
};

const Projects = () => {
  const { data, isError, isLoading } = useProjects();
  const [filter, setFilter] = useState("");

  const list = useMemo(() => {
    return (data ?? []).filter((project) => {
      const q = filter.toLowerCase().trim();
      if (!q) return true;
      const name = (project?.name ?? "").toLowerCase();
      const company = (project?.company ?? "").toLowerCase();
      const desc = (project?.description ?? "").toLowerCase();
      const city = (project?.city ?? "").toLowerCase();
      const country = (project?.country ?? "").toLowerCase();
      return (
        name.includes(q) ||
        company.includes(q) ||
        desc.includes(q) ||
        city.includes(q) ||
        country.includes(q)
      );
    });
  }, [data, filter]);

  if (isError) {
    return (
      <div className="projects-page">
        <div className="wrapper paddings innerWidth">
          <span>Error while fetching data</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="projects-page">
        <div
          className="wrapper flexCenter paddings innerWidth"
          style={{ minHeight: "60vh" }}
        >
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <header className="projects-hero">
        <div className="projects-hero__canvas" aria-hidden>
          <div className="projects-hero__art" />
          <div className="projects-hero__grid" />
          <div className="projects-hero__glow" />
          <div className="projects-hero__gradient" />
        </div>
        <div className="projects-hero__inner paddings innerWidth">
          <p className="projects-hero__eyebrow">Projects</p>

          <label className="projects-hero__search">
            <span className="visually-hidden">Search projects</span>
            <HiOutlineSearch className="projects-hero__search-icon" aria-hidden />
            <input
              type="search"
              className="projects-hero__input"
              placeholder="Search projects…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
      </header>

      <section className="projects-strips" aria-label="Project list">
        {list.length === 0 ? (
          <p className="projects-strips__empty paddings innerWidth secondaryText">
            No projects match your search.
          </p>
        ) : (
          list.map((card, i) => {
            const id = card.id ?? card._id;
            const title = card?.name ?? card?.title ?? "Project";
            const imageSrc = projectImageSrc(card);
            const isLead = i === 0;
            const toneClass = isLead
              ? ""
              : ` project-strip--tone-${(i - 1) % STRIP_TONE_COUNT}`;
            const reverse = i % 2 === 1;

            return (
              <article
                key={id ?? `project-${i}`}
                className={`project-strip${
                  isLead ? " project-strip--lead" : " project-strip--tinted"
                }${toneClass}${reverse ? " project-strip--reverse" : ""}`}
              >
                <div className="project-strip__inner paddings innerWidth">
                  <div className="project-strip__media">
                    <div className="project-strip__frame">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt=""
                          className="project-strip__img"
                        />
                      ) : (
                        <div
                          className="project-strip__img project-strip__img--placeholder"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>
                  <div className="project-strip__copy">
                    {card?.company ? (
                      <p className="project-strip__eyebrow">{card.company}</p>
                    ) : null}
                    <h2 className="project-strip__title primaryText">
                      {truncate(title, { length: 72 })}
                    </h2>
                    <p className="project-strip__desc secondaryText">
                      {truncate(card?.description ?? "", { length: 280 })}
                    </p>
                    <Link
                      to={`/projects/${id}`}
                      className="project-strip__cta"
                      aria-label={`Open project: ${title}`}
                    >
                      <span className="project-strip__cta-label">View project</span>
                      <span className="project-strip__cta-icon" aria-hidden>
                        <HiOutlineArrowRight />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Projects;
