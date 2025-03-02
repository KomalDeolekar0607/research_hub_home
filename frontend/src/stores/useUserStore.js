import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null, // Stores the logged-in user's data
  loading: false, // Indicates if an operation is in progress
  checkingAuth: true, // Indicates if the app is checking the user's authentication status

  // Signup method
  signup: async ({ name, email, password, confirmPassword, affiliation, role, expertise, researchInterests }) => {
    set({ loading: true });

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({ loading: false });
      return;
    }

    try {
      // Send signup request to the backend
      const res = await axios.post("/v1/users/signup", {
        name,
        email,
        password,
        affiliation,
        role,
        expertise,
        researchInterests,
      });

      console.log(res.data);

      // Set the user data and show success message
      set({ user: res.data, loading: false });
      toast.success("Signed up successfully");
    } catch (error) {
      set({ loading: false });
      console.error("Error signing up:", error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred during signup");
    }
  },

  // Login method
  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/v1/users/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ loading: false });
      if (error.response) {
        console.error("Error logging in:", error.response?.data);
        toast.error(error.response?.data?.message || "An error occurred");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received from server");
      } else {
        console.error("Error in request setup:", error.message);
        toast.error("Error in request setup: " + error.message);
      }
    }
  }
}));