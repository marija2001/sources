import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useProject from "../../hooks/useProject";
import "./Project.css";

function resolveImageSrc(img) {
  if (!img || typeof img !== "string") return "";
  const trimmed = img.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function splitParagraphs(text) {
  if (!text || typeof text !== "string") return [];
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const Project = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useProject(projectId);

  const is404 = error?.response?.status === 404;
  const imageSrc = resolveImageSrc(data?.image);
  const paragraphs = splitParagraphs(data?.description);

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
          <p className="primaryText project-page__state-title">Project not found</p>
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
          <p className="primaryText project-page__state-title">Could not load project</p>
          <p className="secondaryText">Please try again later.</p>
          <Link className="project-page__back project-page__back--block" to="/projects">
            ← All projects
          </Link>
        </div>
      </main>
    );
  }

  const title = data.name?.trim() || "Project";

  return (
    <main className="project-page">
      <article className="project-page__article paddings innerWidth">
        <header className="project-page__header">
          <p className="project-page__eyebrow">Project</p>
          <h1 className="project-page__title primaryText">{title}</h1>
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
            {paragraphs.length > 0 ? (
              paragraphs.map((block, i) => (
                <p key={i} className="project-page__prose secondaryText">
                  {block}
                </p>
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
