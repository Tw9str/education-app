"use client";
import React, { useState, useEffect } from "react";

const Settings = () => {
  // Initial state
  const [userData, setUserData] = useState({
    createdAt: "",
    email: "",
    password: "",
    plan: "",
    role: "",
    updatedAt: "",
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user data from the backend (mocking the data fetch here)
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with your actual API call
      const response = {
        createdAt: "2024-07-28T15:35:29.602Z",
        email: "test@test.com",
        password: "$2b$10$z5MUh6",
        plan: "free",
        role: "admin",
        updatedAt: "2024-08-01T04:16:48.902Z",
        username: "admin",
      };
      setUserData(response);
    };

    fetchData();
  }, []);

  // Handle form submission for updating user data
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your update logic here, e.g., send data to backend
    console.log("Updated user data:", userData);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full lg:w-2/3 p-8 my-8 mx-auto bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Account Settings</h1>
        <p className="text-sm text-gray-600">Update your account details</p>
      </div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="space-y-4">
          <label htmlFor="username" className="block text-sm text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            readOnly={userData.role === "admin"}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-4">
          <label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
        </div>

        {/* Current Password */}
        <div className="space-y-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm text-gray-600"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Current Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
        </div>

        {/* New Password */}
        <div className="space-y-4">
          <label htmlFor="newPassword" className="block text-sm text-gray-600">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
        </div>

        {/* Confirm New Password */}
        <div className="space-y-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-600"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
        </div>

        {/* Plan */}
        <div className="space-y-4">
          <label htmlFor="plan" className="block text-sm text-gray-600">
            Plan
          </label>
          <input
            type="text"
            id="plan"
            name="plan"
            value={userData.plan}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Role */}
        <div className="space-y-4">
          <label htmlFor="role" className="block text-sm text-gray-600">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={userData.role}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
