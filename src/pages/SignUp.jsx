import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // affiliation: "",
    role: "",
    expertise: "",
    interest: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🚀 Handle sign-up logic (e.g., API call)
    console.log("User Registered:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />
          {/* <input type="text" name="affiliation" placeholder="Affiliation (University, Company, etc.)" value={formData.affiliation} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" /> */}
          <input type="text" name="role" placeholder="Role / Position" value={formData.role} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />
          <input type="text" name="expertise" placeholder="Field of Expertise" value={formData.expertise} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />
          <input type="text" name="interest" placeholder="Field of Interest" value={formData.interest} onChange={handleChange} required className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400" />

          <button type="submit" className="w-full p-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
