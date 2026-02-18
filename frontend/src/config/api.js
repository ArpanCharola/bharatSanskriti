const defaultApiBaseUrl = "http://localhost:5000";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(
  /\/+$/,
  ""
);
