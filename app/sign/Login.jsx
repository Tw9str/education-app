"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login({ onFormSwitch }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-gray-950 my-3 text-4xl font-bold">Sign in</h1>
        <p className="text-gray-600 text-sm">Sign in to access your account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-gray-600 block mb-2 text-sm"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="example@domain.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="text-gray-600 flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Link
                rel="noopener noreferrer"
                href="#"
                className="text-gray-950 text-xs hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="text-white w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:bg-green-400 duration-300"
            >
              Sign in
            </button>
          </div>
          <p className="text-gray-600 px-6 text-sm text-center">
            Don't have an account yet?{" "}
            <button
              type="button"
              className="text-gray-950 hover:underline"
              onClick={onFormSwitch}
            >
              Sign up
            </button>
            .
          </p>
        </div>
      </form>
    </>
  );
}
