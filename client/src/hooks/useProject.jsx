import { useQuery } from "react-query";
import { getProject } from "../utils/api";

const useProject = (id) => {
  return useQuery(["project", id], () => getProject(id), {
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });
};

export default useProject;
