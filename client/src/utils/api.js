import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

//ovo ostavlljam za lokalno pokretanje 

// export const api = axios.create({
//   baseURL: "http://localhost:8000/api",
// });
export const api = axios.create({
  baseURL: "https://api.sourcesllc.com/api",
});


// ✔ Dohvatanje svih projekata
export const getAllProjects = async () => {
  try {
    const response = await api.get("/projects/allprj", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

// ✔ Dohvatanje projekta po ID-ju
export const getProject = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

// ✔ Kreiranje korisnika
export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

// ✔ Dodavanje projekta (bivše createProject)
export const createProject = async (data, token) => {
  try {
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
  } catch (error) {
    toast.error("Could not create project");
    throw error;
  }
};

// ✔ Dodavanje u favorite
export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

// ✔ Dohvatanje svih favorita
export const getAllFav = async (email, token) => {
  if (!token) return;

  try {
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
  } catch (e) {
    toast.error("Something went wrong while fetching favs");
    throw e;
  }
};

// ✔ Bookiranje (ako ga zadržiš za projekte)
export const bookVisit = async (date, projectId, email, token) => {
  try {
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
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

// ✔ Uklanjanje rezervacije
export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

// ✔ Dohvatanje svih rezervacija korisnika
export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
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
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};
