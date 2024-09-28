import http from "./httpService";

const apiEndpoint = "/plants";

function getAllPlants() {
  const url = apiEndpoint;
  return http.get(url);
}

function getPlant(id: string) {
  const url = `${apiEndpoint}/${id}`;
  return http.get(url);
}

function addPlant(data: FormData) {
  const url = apiEndpoint;
  return http.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updatePlant(data: FormData, id: string) {
  const url = apiEndpoint + "/" + id;
  return http.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function deletePlant(id: string) {
  const url = `${apiEndpoint}/${id}`;
  return http.delete(url);
}

const plantsService = {
  getAllPlants,
  addPlant,
  getPlant,
  updatePlant,
  deletePlant,
};

export default plantsService;
