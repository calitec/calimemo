import axios from "axios";

export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? "http://api.calimemo.info/"
    : "http://localhost:3001";

axios.defaults.baseURL = DOMAIN;

export const httpCall = (method, url, data) => {
  return axios({
    method,
    baseURL: DOMAIN,
    url: url,
    data,
    withCredentials: true,
  })
    .then((result) => result.data)
    .catch((result) => {
      const { status } = result.response;
      // if (status === UNAUTHORIZED) onUnauthorized();
      throw result.response;
    });
};
