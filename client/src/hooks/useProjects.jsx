import React from "react";
import { useQuery } from "react-query";
import { getAllProjects } from "../utils/api";

const useProjects = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProjects",
    getAllProjects,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProjects;
