import "./Residencies.css";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useProjects from "../../hooks/useProjects";
import ProjectCarousel from "../ProjectCarousel/ProjectCarousel";

const Residencies = () => {
  const { data, isError, isLoading } = useProjects();
  const projects = data ?? [];

  if (isError) {
    return (
      <section
        className="home-projects-band home-projects-band--photo-bg"
        id="residencies"
      >
        <div className="home-projects-band-body paddings innerWidth">
          <span className="home-projects-error">Error while fetching data</span>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section
        className="home-projects-band home-projects-band--photo-bg"
        id="residencies"
      >
        <div
          className="home-projects-band-body flexCenter paddings innerWidth"
          style={{ minHeight: "40vh" }}
        >
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="Loading projects"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className="home-projects-band home-projects-band--photo-bg"
      id="residencies"
    >
      <div className="home-projects-band-body paddings innerWidth">
        <div className="home-projects-newsroom__intro">
          <p className="home-projects-newsroom__eyebrow">Projects</p>
          <h2 className="home-projects-newsroom__heading">Sources newsroom</h2>
          <Link className="home-projects-newsroom__link" to="/projects">
            View all projects
          </Link>
        </div>

        <div className="home-projects-showcase home-projects-showcase--centered">
          <ProjectCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
};

export default Residencies;
