import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../components/Api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        username,
        password,
      });

      setError("");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        setError(
          error.response.data.message || "An error occurred. Please try again.",
        );
      } else {
        console.error("Error:", error.message);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-500">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-medium">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
