import { useQuery } from "react-query";
import { getTeamMembers } from "../utils/api";

const useTeamMembers = () => {
  return useQuery("teamMembers", getTeamMembers, {
    refetchOnWindowFocus: false,
  });
};

export default useTeamMembers;
