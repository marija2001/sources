import React, { useState } from "react";
//import SearchBar from "../../components/SearchBar/SearchBar";
import "./Projects.css";
import useProjects from "../../hooks/useProjects";
import { PuffLoader } from "react-spinners";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
const Projects = () => {
  const { data, isError, isLoading } = useProjects();
  const [filter, setFilter] = useState("");
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        {/* <SearchBar filter={filter} setFilter={setFilter} /> */}

        <div className="paddings flexCenter properties">
          {(data ?? [])
            .filter((project) => {
              const q = filter.toLowerCase();
              const name = (project?.name ?? "").toLowerCase();
              const company = (project?.company ?? "").toLowerCase();
              const desc = (project?.description ?? "").toLowerCase();
              const city = (project?.city ?? "").toLowerCase();
              const country = (project?.country ?? "").toLowerCase();
              return (
                name.includes(q) ||
                company.includes(q) ||
                desc.includes(q) ||
                city.includes(q) ||
                country.includes(q)
              );
            })
            .map((card, i) => (
              <ProjectCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
