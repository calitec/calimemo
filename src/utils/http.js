import axios from "axios";

export const DOMAIN =
  process.env.NODE_ENV == "production"
    ? "http://api.calimemo.info/"
    : "http://localhost:3001";

axios.defaults.baseURL = DOMAIN;
