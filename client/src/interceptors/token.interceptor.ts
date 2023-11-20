import axios, { InternalAxiosRequestConfig } from "axios";
import { getAuth } from "firebase/auth";
import { SettingsConfig } from "../config/settings.config";

const axiosInstance = axios.create({
  baseURL: SettingsConfig.getBaseUrl(),
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
