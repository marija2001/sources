import { Link } from "react-router-dom";
import { truncate } from "lodash";
import "./HomeProjectCard.css";

const HomeProjectCard = ({ card }) => {
  const title = card?.name ?? card?.title ?? "Project";
  const desc = card?.description ?? "";
  const imageSrc = (() => {
    const img = card?.image;
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? img : `/${img}`;
  })();

  return (
    <Link to={`/projects/${card.id}`} className="home-project-card">
      <div className="home-project-card__media">
        {imageSrc ? (
          <img src={imageSrc} alt="" />
        ) : (
          <div className="home-project-card__placeholder" aria-hidden />
        )}
      </div>
      <div className="home-project-card__body">
        <h3 className="home-project-card__title">{truncate(title, { length: 72 })}</h3>
        <p className="home-project-card__excerpt">
          {truncate(desc, { length: 140 })}
        </p>
        <span className="home-project-card__cta">View project</span>
      </div>
    </Link>
  );
};

export default HomeProjectCard;
