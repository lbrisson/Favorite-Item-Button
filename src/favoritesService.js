import axios from "axios";
import { API_HOST_PREFIX } from "./serviceHelpers";
import * as serviceHelper from "./serviceHelpers";

let endpoint = `${API_HOST_PREFIX}/api/favorites`;

let addRequest = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

let deleteById = (favoritedId) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${favoritedId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getAllUserFavorites = (pageIndex, pageSize, userId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/products/${userId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addRequest, deleteById, getAllUserFavorites };
