import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useProject from "../../hooks/useProject";
import DefaultProjectView from "./DefaultProjectView";
import HaccpProjectView from "./views/HaccpProjectView";
import { isHaccpProject } from "./projectTemplates";
import "./Project.css";

const Project = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useProject(projectId);

  const is404 = error?.response?.status === 404;

  if (isLoading) {
    return (
      <main className="project-page">
        <div className="project-page__state paddings innerWidth">
          <PuffLoader color="#4066ff" size={56} aria-label="Loading project" />
        </div>
        <div className="project-page__foot paddings innerWidth">
          <Link className="project-page__back" to="/projects">
            ← All projects
          </Link>
        </div>
      </main>
    );
  }

  if (isError && is404) {
    return (
      <main className="project-page">
        <div className="project-page__state project-page__state--text paddings innerWidth">
          <p className="heading-2 project-page__state-title">Project not found</p>
          <p className="secondaryText">
            This case study may have been removed or the link is outdated.
          </p>
          <Link className="project-page__back project-page__back--block" to="/projects">
            ← All projects
          </Link>
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="project-page">
        <div className="project-page__state project-page__state--text paddings innerWidth">
          <p className="heading-2 project-page__state-title">Could not load project</p>
          <p className="secondaryText">Please try again later.</p>
          <Link className="project-page__back project-page__back--block" to="/projects">
            ← All projects
          </Link>
        </div>
      </main>
    );
  }

  if (isHaccpProject(data)) {
    return <HaccpProjectView project={data} />;
  }

  return (
    <main className="project-page">
      <DefaultProjectView data={data} />
    </main>
  );
};

export default Project;
