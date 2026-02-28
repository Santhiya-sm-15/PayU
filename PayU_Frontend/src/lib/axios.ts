import axios from "axios";
import { authApi } from "../config/env";

const api = axios.create({
    baseURL: authApi,
    
    withCredentials: true
});

export default api;