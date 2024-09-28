import { io } from "socket.io-client";
// import authService from "./authService";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const baseURL = import.meta.env.VITE_APP_API_URL;

const URL = process.env.NODE_ENV === "production" ? undefined : baseURL;
console.log(baseURL, "baseURL");

export const socket = io(URL as string, {
  extraHeaders: {
    authorization: `bearer ${localStorage.getItem("token")}`,
    // ["x-auth-token"]: `${localStorage.getItem("token")}`,
  },
});
