"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        router.push("/auth/login");
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-gray-950 my-3 text-4xl font-bold">Register</h1>
        <p className="text-gray-600 text-sm ">
          Create an account to access features
        </p>
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
              placeholder="user"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600 block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              onChange={handleInputChange}
              required
              aria-required="true"
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
              required
              aria-required="true"
            />
          </div>
        </div>
        <div className="space-y-2">
          {message && <p className="text-red-500">{message}</p>}
          <div>
            <button
              type="submit"
              className={`text-white w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:bg-green-400 duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
          <p className="text-gray-600 px-6 text-sm text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gray-950 hover:underline">
              Sign in
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}
