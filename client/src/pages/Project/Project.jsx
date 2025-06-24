import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProject } from "../../utils/api.js";
import { PuffLoader } from "react-spinners";
import "./Project.css";

const Project = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["project", id], () =>
    getProject(id)
  );

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error loading project details.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="flexStart project-layout">
          {/* Left – Image */}
          <div className="project-image-wrapper">
            <img
              src={`/${data.image}`}
              alt={data.name}
              className="project-image"
            />
          </div>

          {/* Right – Content */}
          <div className="project-content">
            <h2 className="primaryText">{data.name}</h2>
            <p className="secondaryText project-description">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
