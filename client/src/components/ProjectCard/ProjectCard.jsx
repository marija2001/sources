import React from "react";
import './ProjectCard.css'
import {AiFillHeart} from 'react-icons/ai'
import {truncate} from 'lodash'
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";
const ProjectCard = ({card}) => {

  const navigate = useNavigate();
  const title = card?.name ?? card?.title ?? "";
  const imageSrc = (() => {
    const img = card?.image;
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? img : `/${img}`;
  })();

  return (
    <div className="flexColStart r-card"
    onClick={()=>navigate(`../projects/${card.id}`)}
    >
      <Heart id={card?.id}/>
      <img src={imageSrc} alt="" />
      {card?.price != null && card?.price !== "" && (
        <span className="secondaryText r-price">
          <span>{card.price}</span>
        </span>
      )}
      <span className="primaryText">{truncate(title, {length: 15})}</span>
      <span className="secondaryText">{truncate(card?.description ?? "", {length: 80})}</span>
    </div>
  );
};

export default ProjectCard;
