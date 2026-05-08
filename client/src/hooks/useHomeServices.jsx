import { useQuery } from "react-query";
import { getHomeServices } from "../utils/api";

const useHomeServices = () => {
  return useQuery("homeServices", getHomeServices, {
    refetchOnWindowFocus: false,
  });
};

export default useHomeServices;
