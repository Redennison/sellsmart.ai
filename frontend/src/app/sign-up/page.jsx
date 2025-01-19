"use client";

import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation"

const SignUpPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(formData.email, formData.password);
      if (res.error) {
        throw new Error("Invalid sign up. Please try again or use a different email.")
      }
      sessionStorage.setItem("user", JSON.stringify(res?.user || null));
      setFormData({ email: "", password: "" });
      return router.push("/sign-in")
    } catch (error) {
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="w-full max-w-md bg-black/80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 uppercase tracking-wide"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 uppercase tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength="6"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-700"
            } text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out transform hover:scale-105`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
