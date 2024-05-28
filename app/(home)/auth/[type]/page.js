import React from "react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

export default function Auth({ params }) {
  const type = params.type;
  return (
    <div className="bg-gray-50 flex flex-col max-w-md mx-auto mt-20 p-6 rounded-md sm:p-10">
      {type === "login" ? (
        <Login />
      ) : type === "register" ? (
        <Register />
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
}
