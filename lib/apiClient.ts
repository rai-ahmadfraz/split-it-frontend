'use client';
import axios from "axios";
import { useUserStore } from "@/store/userStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from store
apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for global handling
apiClient.interceptors.response.use(
  (response) => {
    // Handle all success responses (2xx)
    if (response.status === 201) {
      alert(response.data.message || "Created successfully!");
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    switch (error.status) {
      case 400:
        alert(message);
        break;
      case 401:
        alert("Unauthorized! Please login again.");
        useUserStore.getState().logout();
        break;
      case 403:
        alert("Forbidden! You don’t have permission.");
        break;
      case 404:
        alert("Resource not found!");
        break;
      case 409:
        alert("Conflict! Resource already exists.");
        break;
      case 500:
        alert("Server error! Try again later.");
        break;
      default:
        alert(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
