"use client";
import Notification from "@/components/widgets/Notification";
import { useState } from "react";

export default function AddCategory() {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [messages, setMessages] = useState({
    message: "",
    error: "",
  });
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsNotificationOn(true);
    const formData = new FormData();
    formData.append("title", categoryTitle);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/category/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: categoryTitle }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setCategoryTitle("");
      setMessages({ ...messages, message: data.message, error: "" });
    } else {
      setMessages({ ...messages, message: data.message, error: data.error });
    }
  }

  return (
    <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Add Category</h1>
        <p className="text-sm text-gray-600">Enter category title</p>
      </div>
      <form className="space-y-8 w-full" onSubmit={handleFormSubmit}>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-green-500"
          type="text"
          name="title"
          placeholder="Title"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          required
        />
        <button
          className="rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          type="submit"
        >
          Add
        </button>
      </form>
      <Notification
        isNotificationOn={isNotificationOn}
        onNotificationClose={setIsNotificationOn}
        messages={messages}
      />
    </div>
  );
}
