import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useProject from "../../hooks/useProject";
import DescriptionBlock from "./DescriptionBlock";
import { splitDescriptionBlocks } from "../../utils/projectDescription";
import "./Project.css";

function resolveImageSrc(img) {
  if (!img || typeof img !== "string") return "";
  const trimmed = img.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const Project = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useProject(projectId);

  const is404 = error?.response?.status === 404;
  const imageSrc = resolveImageSrc(data?.image);
  const blocks = splitDescriptionBlocks(data?.description);

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

  const title = (data.name ?? data.title ?? "").trim() || "Project";

  return (
    <main className="project-page">
      <article className="project-page__article paddings innerWidth">
        <header className="project-page__header">
          <p className="eyebrow">Project</p>
          <h1 className="heading-1 project-page__title">{title}</h1>
        </header>

        <div
          className={`project-page__layout${imageSrc ? "" : " project-page__layout--no-image"}`}
        >
          {imageSrc ? (
            <figure className="project-page__figure">
              <img
                className="project-page__photo"
                src={imageSrc}
                alt=""
                width={560}
                height={360}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : null}

          <div className="project-page__body">
            {blocks.length > 0 ? (
              blocks.map((block, i) => (
                <DescriptionBlock key={i} block={block} />
              ))
            ) : (
              <p className="project-page__prose secondaryText">No description yet.</p>
            )}
          </div>
        </div>
      </article>

      <div className="project-page__foot paddings innerWidth">
        <Link className="project-page__back" to="/projects">
          ← All projects
        </Link>
      </div>
    </main>
  );
};

export default Project;
