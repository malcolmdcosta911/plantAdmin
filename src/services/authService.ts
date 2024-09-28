/* eslint-disable @typescript-eslint/no-explicit-any */
//no user service as no register

import http from "./httpService";
import { jwtDecode } from "jwt-decode";
import { socket } from "./socket";

const apiEndpoint = "/auth";

const tokenKey = "token";

// on window.location.href = "/"; axios.defaults.headers.common is reset
http.setJwt(getJwt());

async function login(email: any, password: any) {
  const url = apiEndpoint + "/admin";
  // const { data: jwt } = await http.post(url, { email, password });
  //  localStorage.setItem(tokenKey, jwt);
  const res = await http.post(url, { email, password });
  localStorage.setItem(tokenKey, res.data.token);
}

function logout() {
  // socket.disconnect()
  socket.emit("userLogout");
  localStorage.removeItem(tokenKey);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (!jwt) throw new Error("Invalid Jwt");
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

function verifyPhone(phone: string) {
  const url = apiEndpoint + "/verify-phone";
  return http.post(url, { phone });
}

function verifyOtp(otp: string) {
  const url = apiEndpoint + "/verify-otp";
  return http.post(url, { otp });
}

function resetPassword(newPassword: string, confirmPassword: string) {
  const url = apiEndpoint + "/reset-password";
  return http.post(
    url,
    {
      password: newPassword,
      confirm_password: confirmPassword,
    }
    // { withCredentials: true }
  );
}

const authService = {
  login,
  logout,
  getCurrentUser,
  verifyPhone,
  verifyOtp,
  resetPassword,
};

export default authService;
