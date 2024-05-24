"use client";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function page() {
  const [isLogin, setIslogin] = useState(true);

  function handleFormSwitch(e) {
    e.preventDefault();
    setIslogin((prev) => !prev);
  }
  return (
    <div className="bg-gray-50 flex flex-col max-w-md mx-auto mt-16 p-6 rounded-md sm:p-10">
      {isLogin ? (
        <Login onFormSwitch={handleFormSwitch} />
      ) : (
        <Register onFormSwitch={handleFormSwitch} />
      )}
    </div>
  );
}
