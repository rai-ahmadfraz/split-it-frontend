'use client';
import apiClient from "@/lib/apiClient";

export const friendService = {
  
  async getFriends() {
    const response = await apiClient.get("/friends");
    return response.data;
  },
};
