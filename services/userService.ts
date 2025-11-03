'use client';
import apiClient from "@/lib/apiClient";
import { User } from "@/interfaces/user";

export const userService = {
  
  async getUsers() {
    const response = await apiClient.get("/users");
    return response.data;
  },

async login(formdata: { email: string; password: string }) {

  try {
    const response = await apiClient.post('/login', formdata);
    if(response && response.data){
      return response.data;
    }
    return response;
  } catch (error: any) {
    if (error.response) {
      alert(`Error ${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error('Error:', error.message);
      throw error;
    }
  }
},


  async createUser(user: User) {
    const response = await apiClient.post("/register", user);
    return response.data;
  },
  async getExpenseSummary() {
    const response = await apiClient.get("/expenses/summary");
    return response.data;
  },
 async getExpensesByMemberId(memberId: number) {
  const response = await apiClient.get(`/expenses/member/${memberId}`);
  if(response.data && response.data.expenses){
    return response.data.expenses;
  }
}



};
