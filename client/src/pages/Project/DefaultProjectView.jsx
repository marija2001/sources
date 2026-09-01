import { Link } from "react-router-dom";
import DescriptionBlock from "./DescriptionBlock";
import { splitDescriptionBlocks } from "../../utils/projectDescription";

function resolveImageSrc(img) {
  if (!img || typeof img !== "string") return "";
  const trimmed = img.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function DefaultProjectView({ data }) {
  const title = (data.name ?? data.title ?? "").trim() || "Project";
  const imageSrc = resolveImageSrc(data?.image);
  const blocks = splitDescriptionBlocks(data?.description);

  return (
    <>
      <article className="project-page__article paddings innerWidth">
        <header className="project-page__header">
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
    </>
  );
}

export default DefaultProjectView;
