import http from "./httpService";

const apiEndpoint = "/users";

//better cause jwt doesnt have all values needed
function getUserProfile() {
  const url = apiEndpoint + "/me";
  return http.get(url);
}

function getAllUsers() {
  const url = apiEndpoint + "/all";
  return http.get(url);
}

const userService = { getUserProfile, getAllUsers };

export default userService;
