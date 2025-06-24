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
          {
            // data.map((card, i)=> (<ProjectCard card={card} key={i}/>))

            data
              .filter(
                (property) =>
                  property?.name.toLowerCase().includes(filter.toLowerCase()) ||
                  property?.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property?.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <ProjectCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Projects;
