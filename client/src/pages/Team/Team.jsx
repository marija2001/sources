import React from "react";
import { Link } from "react-router-dom";
import "./Team.css";

const Team = () => {
  return (
    <main className="team-page paddings innerWidth">
      <p className="team-page__eyebrow">Team</p>
      <h1 className="team-page__title primaryText">People</h1>
      <p className="team-page__lede secondaryText">
        Team profiles and bios will go here. Replace this copy and add photos or
        cards when the content is ready.
      </p>
      <Link className="button team-page__back" to="/">
        Back to home
      </Link>
    </main>
  );
};

export default Team;
