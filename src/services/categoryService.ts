import http from "./httpService";

const apiEndpoint = "/plant-categories";

function getAllCategories() {
  const url = apiEndpoint;
  return http.get(url);
}

const categoryService = { getAllCategories };

export default categoryService;
