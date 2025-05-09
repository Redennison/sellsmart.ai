"use client";

import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { createUserHistory } from "@/lib/utils";

const SignUpPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      const res = await createUserWithEmailAndPassword(formData.email, formData.password);
      if (!res?.user) throw new Error("Sign-up failed. Try again.");

      sessionStorage.setItem("user", JSON.stringify(res.user));

      await createUserHistory(res?.user)
      router.push("/analyze");
    } catch (error) {
      setErrorMessage(error.message || "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="w-full max-w-md bg-black/80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h1>

        {errorMessage && (
          <div className="text-sm text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 uppercase">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 uppercase">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength="6"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-600" : "bg-green-500 hover:bg-green-600"
            } text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/sign-in" className="text-green-400 hover:text-green-500 underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
