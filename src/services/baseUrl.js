import axios from "axios";

const api = axios.create({
  baseURL: "https://quiz-app-test-01.azurewebsites.net",
  //   baseURL: "http://localhost:3001",
});

export default api;
