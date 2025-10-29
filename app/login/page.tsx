"use client";
import Link from "next/link";
import { useState } from "react";
import { userService } from "@/services/userServies";

interface FormData {   
    email: string;
    password: string;   
}

export default function Login() {  


    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',   
    }); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });  
    }

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await userService.login(formData);
        console.log('Form submitted:', response);   
    }
    return <div className="login-page">
      <div className="login-card">
        <h1>Create Account</h1>
        <p>Login SplitIt and start managing your expenses easily.</p>

        <form className="login-form" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        <p className="login-link">
          Don't have an account?  <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>;
}