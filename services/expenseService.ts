'use client';
import apiClient from "@/lib/apiClient";

export const expenseService = {
  
  async AddExpense(payload: any ) {
    const response =  await apiClient.post('/expenses', payload);
    if(response.data && response.data){
      return response.data;
    }
  },
};
