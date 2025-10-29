// src/services/userService.ts
import apiClient from "@/lib/apiClient";
import { User } from "@/interfaces/user";
export const userService = {
  async getUsers() {
    const response = await apiClient.get("/users");
    return response.data;
  },

  async login(formdata: { email: string; password: string }) {
    const response = await apiClient.post('/login', formdata);
    return response.data;
  },



  async createUser(user: User) {
    const response = await apiClient.post("/register", user);
    return response.data;
  },
};
