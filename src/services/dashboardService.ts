import http from "./httpService";

const apiEndpoint = "/dashboard";

function getAdminDashboard() {
  const url = apiEndpoint + "/admin";
  return http.get(url);
}

const dashboardService = { getAdminDashboard };

export default dashboardService;
