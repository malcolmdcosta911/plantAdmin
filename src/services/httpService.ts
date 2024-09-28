/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { toast } from "react-toastify";
import authService from "./authService";

function setJwt(jwt: any) {
  instance.defaults.headers.common["x-auth-token"] = jwt;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api",
  timeout: 3000,
  withCredentials: true, //for cookies
  responseType: "json", // default
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    //not displayed for login jwt
    if (response?.data && response.data?.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response?.status && error.response?.status == 401) {
      //logout user on token expire
      authService.logout();
      window.location.href = "/";
    } else if (error.response?.data && error.response.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

const http = {
  get: instance.get,
  put: instance.put,
  post: instance.post,
  delete: instance.delete,
  setJwt,
};

export default http;
