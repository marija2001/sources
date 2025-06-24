import React, { useContext, useState } from "react";
//import SearchBar from "../../components/SearchBar/SearchBar";
import useProjects from "../../hooks/useProjects";
import { PuffLoader } from "react-spinners";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "../Project/Project.css";
import UserDetailContext from "../../context/UserDetailContext";

const Bookings = () => {
  const { data, isError, isLoading } = useProjects();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { bookings },
  } = useContext(UserDetailContext);

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
              .filter((property) =>
                bookings.map((booking) => booking.id).includes(property.id)
              )

              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
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

export default Bookings;
