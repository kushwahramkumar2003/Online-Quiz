import dotenv from "dotenv";
dotenv.config();
// apiConfig.js

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export default baseURL;
