"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );

      sessionStorage.setItem('user', JSON.stringify(res?.user || null));
      setFormData({ email: "", password: "" });
      return router.push("/analyze"); // Redirect to home page after successful sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="w-full max-w-md bg-black/80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Sign In</h1>

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
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6AA84F] focus:border-[#6AA84F] transition-colors"
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
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6AA84F] focus:border-[#6AA84F] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-600" : "bg-[#6AA84F] hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out transform hover:scale-105`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-[#6AA84F] hover:text-green-700 underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
