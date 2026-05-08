import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pageHero.css";
import "./Projects.css";
import useProjects from "../../hooks/useProjects";
import { PuffLoader } from "react-spinners";
import { HiOutlineSearch } from "react-icons/hi";
import HomeProjectCard from "../../components/HomeProjectCard/HomeProjectCard";

function ProjectsHero() {
  return (
    <section className="page-hero">
      <div className="page-hero__inner paddings innerWidth">
        <p className="page-hero__eyebrow">Work</p>
        <h1 className="page-hero__title">Projects</h1>
        <p className="page-hero__lede">
          Case studies and products we&apos;ve shipped — use search to narrow the
          list.
        </p>
      </div>
    </section>
  );
}

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
        <ProjectsHero />
        <div className="projects-page__body paddings innerWidth">
          <span className="projects-page__error">Error while fetching data</span>
        </div>
        <div className="projects-page__back-wrap paddings innerWidth">
          <Link className="projects-page__back" to="/">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="projects-page">
        <ProjectsHero />
        <div
          className="projects-page__body projects-page__body--center paddings innerWidth"
          style={{ minHeight: "50vh" }}
        >
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
        <div className="projects-page__back-wrap paddings innerWidth">
          <Link className="projects-page__back" to="/">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <ProjectsHero />
      <div className="projects-page__body paddings innerWidth">
        <header className="projects-page__toolbar">
          <label className="projects-page__search">
            <span className="visually-hidden">Search projects</span>
            <HiOutlineSearch className="projects-page__search-icon" aria-hidden />
            <input
              type="search"
              className="projects-page__search-input"
              placeholder="Search projects…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              autoComplete="off"
            />
          </label>
        </header>

        {list.length === 0 ? (
          <p className="projects-page__empty secondaryText">
            No projects match your search.
          </p>
        ) : (
          <div className="projects-page__grid">
            {list.map((card, i) => (
              <HomeProjectCard
                key={card.id ?? card._id ?? `project-${i}`}
                card={card}
              />
            ))}
          </div>
        )}
      </div>
      <div className="projects-page__back-wrap paddings innerWidth">
        <Link className="projects-page__back" to="/">
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default Projects;
