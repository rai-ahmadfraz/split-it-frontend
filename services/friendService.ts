'use client';
import apiClient from "@/lib/apiClient";

export const friendService = {
  
  async getFriends() {
    const response = await apiClient.get("/friends");
    return response.data;
  },
  async addNewFriend(friendId: number) {
    const response = await apiClient.get(`/friends/add/${friendId}`);
    if(response.data && response.data){
      return response.data;
    }
  },
};
