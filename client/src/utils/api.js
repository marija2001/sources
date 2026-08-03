import axios from "axios";
import dayjs from "dayjs";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "/api" : "https://api.sourcesllc.com/api");

export const api = axios.create({ baseURL });

export const getHomeServices = () =>
  api
    .get("/content/home-services", { timeout: 10 * 1000 })
    .then((r) => r.data);

export const getTeamMembers = () =>
  api.get("/content/team", { timeout: 10 * 1000 }).then((r) => r.data);

export const getAllProjects = () =>
  api.get("/projects/allprj", { timeout: 10 * 1000 }).then((r) => r.data);

export const getProject = (id) =>
  api.get(`/projects/${id}`, { timeout: 10 * 1000 }).then((r) => r.data);

export const createUser = async (email, token) => {
  await api.post(
    `/user/register`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createProject = async (data, token) => {
  const res = await api.post(
    `/projects/create`,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const toFav = async (id, email, token) => {
  await api.post(
    `/user/toFav/${id}`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  const res = await api.post(
    `/user/allFav`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data["favProjectsID"];
};

export const bookVisit = async (date, projectId, email, token) => {
  await api.post(
    `/user/bookVisit/${projectId}`,
    {
      email,
      id: projectId,
      date: dayjs(date).format("DD/MM/YYYY"),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeBooking = async (id, email, token) => {
  await api.post(
    `/user/removeBooking/${id}`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllBookings = async (email, token) => {
  if (!token) return;
  const res = await api.post(
    `/user/allBookings`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data["bookedVisits"];
};
