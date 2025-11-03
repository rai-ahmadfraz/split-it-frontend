"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { userService } from "@/services/userService";
export default function Singup() { 
interface FormData {   
    name: string;
    email: string;
    password: string;  
}     
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',   
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
       const response = await userService.createUser(formData);
       if(response.id){
        alert('User registered successfully!');
       }else{
        alert(response.message || 'Registration failed.');
       }
    }
    
    return <div className="signup-page">
      <div className="signup-card">
        <h1>Create Account</h1>
        <p>Join SplitIt and start managing your expenses easily.</p>

        <form className="signup-form" onSubmit={registerUser}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account?  <Link href="/login">Login in</Link>
        </p>
      </div>
    </div>;
}