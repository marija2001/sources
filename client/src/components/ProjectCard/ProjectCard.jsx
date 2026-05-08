import React from "react";
import "./ProjectCard.css";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";

const ProjectCard = ({ card }) => {
  const navigate = useNavigate();
  const title = card?.name ?? card?.title ?? "";
  const imageSrc = (() => {
    const img = card?.image;
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? img : `/${img}`;
  })();

  return (
    <article
      className="r-card"
      onClick={() => navigate(`../projects/${card.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`../projects/${card.id}`);
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className="r-card__media">
        <Heart id={card?.id} />
        <img src={imageSrc} alt="" />
      </div>
      <div className="r-card__body">
        {card?.price != null && card?.price !== "" && (
          <span className="r-card__price">{card.price}</span>
        )}
        <h2 className="r-card__title">{truncate(title, { length: 48 })}</h2>
        <p className="r-card__desc">
          {truncate(card?.description ?? "", { length: 220 })}
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;
