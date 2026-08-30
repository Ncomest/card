import { fetchApi } from "@/shared/api";

export const getRoll = () => {
  return fetchApi({
    API_URI: "/api/dice",
    method: "PUT",
    body: { user: sessionStorage.getItem("player") },
  }).catch((err) => {
    console.log(err);
  });
};

export const refreshStep = async () => {
  return await fetchApi({
    API_URI: "/api/table/refstep",
    method: "PUT",
    body: {
      user: sessionStorage.getItem("player"),
    },
  });
};
